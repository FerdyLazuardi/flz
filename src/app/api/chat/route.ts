import { NextResponse } from "next/server"
import { ASKFER_PERSONA, PORTFOLIO_KNOWLEDGE_CONTEXT } from "@/lib/portfolio-knowledge"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const query = body.query || body.message || ""

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY

    // If API key is missing on server, log error internally & return clean visitor fallback
    if (!apiKey) {
      console.error("[Server Error] OPENROUTER_API_KEY is missing in process.env")
      const fallbackText = "Maaf, layanan AI chat sedang tidak dapat diakses saat ini. Silakan coba lagi nanti atau hubungi aku langsung via LinkedIn / Email."
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: fallbackText })}\n\n`))
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        },
      })
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
          "X-Accel-Buffering": "no",
        },
      })
    }

    const systemMessage = `${ASKFER_PERSONA}\n\n<retrieved_context>\n${PORTFOLIO_KNOWLEDGE_CONTEXT}\n</retrieved_context>`
    const model = process.env.OPENROUTER_MODEL || "deepseek/deepseek-v4-flash-0731"

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        provider: {
          sort: "price",
        },
        include_reasoning: false,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: query },
        ],
        temperature: 0.3,
        stream: true,
      }),
    })

    if (!openRouterResponse.ok || !openRouterResponse.body) {
      const errText = await openRouterResponse.text().catch(() => "")
      console.error("OpenRouter API Error:", openRouterResponse.status, errText)
      
      const fallbackNotice = "Maaf, terjadi kendala teknis saat memproses jawaban. Silakan coba lagi nanti."
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: fallbackNotice })}\n\n`))
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        },
      })
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
          "X-Accel-Buffering": "no",
        },
      })
    }

    const reader = openRouterResponse.body.getReader()
    const decoder = new TextDecoder()
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = ""

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() ?? ""

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed || !trimmed.startsWith("data:")) continue

              const dataStr = trimmed.slice(5).trim()
              if (dataStr === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"))
                continue
              }

              try {
                const parsed = JSON.parse(dataStr)
                let tokenText: string = parsed.choices?.[0]?.delta?.content ?? ""

                if (tokenText) {
                  // Strip all emdashes (—) from output stream
                  tokenText = tokenText.replace(/—/g, "-")
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ token: tokenText })}\n\n`)
                  )
                }
              } catch {
                // Ignore malformed JSON chunks
              }
            }
          }
        } catch (err) {
          console.error("Stream processing error:", err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
        "Content-Encoding": "none",
      },
    })
  } catch (error) {
    console.error("API Route Chat Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

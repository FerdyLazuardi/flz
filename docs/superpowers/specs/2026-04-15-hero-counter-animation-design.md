# Design Spec: Hero Section Counter Animation

Implement a smooth incrementing number animation for the statistics displayed in the `HeroSection` of the portfolio.

## 1. Objective
Enhance the visual appeal of the `HeroSection` by animating the numerical values from 0 to their target values when the user first lands on the website.

## 2. Success Criteria
- [ ] Numbers increment smoothly from 0 to the target value (10, 2, 10.000).
- [ ] Animation triggers only once on initial mount.
- [ ] Formatting matches the original UI (e.g., "10.000+" keeps its dot separator and plus suffix).
- [ ] High performance with no layout shifts.

## 3. Technical Approach
We will use `framer-motion`'s `useMotionValue`, `useTransform`, and `animate` function.

### Counter Component
A local `Counter` component will be added to `HeroSection.tsx`:
- **Props**: `value` (number), `suffix` (string), `duration` (number), `useSeparator` (boolean).
- **Implementation**:
    - `count = useMotionValue(0)`
    - `rounded = useTransform(count, (latest) => Math.floor(latest))`
    - `formatted = useTransform(rounded, (latest) => ...formatting logic...)`
    - `useEffect`: Calls `animate(count, value, { duration, ease: "easeOut" })`

### Target Values
1. **Modules**: `10` + `+`
2. **Experience**: `2` + `+`
3. **Users**: `10000` + `+` (formatted as `10.000+`)

## 4. Components Affected
- `src/components/home/HeroSection.tsx`

## 5. Testing Strategy
- Manual verification of the increment speed and smoothness.
- Verify formatting of "10.000" (dot as thousand separator).
- Refresh page to ensure animation re-runs on mount.

/** Shared easing — expo-out, the backbone of every reveal on the site. */
export const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Wraps a value between min and max (used by the infinite marquee). */
export function wrap(min: number, max: number, v: number): number {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

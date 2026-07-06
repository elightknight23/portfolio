import { useRef, type ReactNode } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { wrap } from '../lib/anim'

/**
 * Infinite marquee whose speed and skew react to scroll velocity —
 * scrolling fast whips the band along; scrolling up reverses its direction.
 * `baseVelocity` is percent-of-strip per second.
 */
export function VelocityMarquee({
  children,
  baseVelocity = -2,
  className = '',
}: {
  children: ReactNode
  baseVelocity?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useSpring(useTransform(smoothVelocity, [-2000, 2000], [-8, 8]), {
    stiffness: 120,
    damping: 25,
  })
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) direction.current = -1
    else if (vf > 0) direction.current = 1
    moveBy += direction.current * moveBy * Math.abs(vf)
    baseX.set(baseX.get() + moveBy)
  })

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x, skewX }} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} aria-hidden={i > 0} className="block shrink-0">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

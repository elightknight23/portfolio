import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { EXPO } from '../lib/anim'

const VIEWPORT = { once: true, margin: '-10% 0px -10% 0px' } as const

/** Hairline rule that draws itself in from the left when scrolled into view.
 *  `accent` adds a short thick rust tick at the left origin for stronger rhythm. */
export function Rule({ className = '', accent = false }: { className?: string; accent?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, ease: EXPO }}
        className="h-px w-full origin-left bg-line"
      />
      {accent && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.1 }}
          className="absolute -top-px left-0 block h-[3px] w-10 origin-left bg-rust"
        />
      )}
    </div>
  )
}

/**
 * Masked line reveal — content slides up from behind an overflow-hidden edge.
 * The viewport trigger lives on the outer (un-clipped) wrapper: the inner
 * element starts fully clipped, so IntersectionObserver would never fire on it.
 */
export function Masked({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`overflow-hidden ${className}`}
    >
      <motion.div
        variants={{
          hidden: { y: '115%' },
          show: { y: '0%', transition: { delay, duration: 0.9, ease: EXPO } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Standard fade-and-rise reveal. */
export function FadeUp({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ delay, duration: 0.85, ease: EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

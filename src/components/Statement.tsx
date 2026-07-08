import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { STATEMENT } from '../content'

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  )
}

/**
 * Scroll-linked statement: each word fades from ghost to full ink as its slice
 * of the paragraph crosses the viewport, so reading pace is tied to scroll.
 */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })

  const words = STATEMENT.text.split(' ')

  return (
    <section id="about" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 lg:px-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <span className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-rust">
            ({STATEMENT.eyebrow})
          </span>
        </div>
        <div ref={ref} className="lg:col-span-8">
          <p className="max-w-[880px] font-grotesk text-[clamp(1.5rem,3.1vw,2.5rem)] font-medium leading-[1.35] tracking-[-0.01em] text-ink">
            {reduce
              ? STATEMENT.text
              : words.map((word, i) => (
                  <span key={i}>
                    <Word
                      word={word}
                      progress={scrollYProgress}
                      range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
                    />{' '}
                  </span>
                ))}
          </p>
        </div>
      </div>
    </section>
  )
}

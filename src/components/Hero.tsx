import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import { EXPO } from '../lib/anim'
import { HERO } from '../content'

const maskUp = (delay: number): Variants => ({
  hidden: { y: '115%' },
  show: { y: '0%', transition: { delay, duration: 0.9, ease: EXPO } },
})

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.9, ease: EXPO } },
})

/** A display letter that leans away from the cursor as it approaches. */
function Letter({
  ch,
  delay,
  masked,
  className = '',
}: {
  ch: string
  delay: number
  masked: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const dx = useSpring(0, { stiffness: 170, damping: 16, mass: 0.45 })
  const dy = useSpring(0, { stiffness: 170, damping: 16, mass: 0.45 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const ox = e.clientX - (r.left + r.width / 2)
      const oy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(ox, oy)
      const RADIUS = 190
      if (dist < RADIUS && dist > 0) {
        const force = (1 - dist / RADIUS) ** 2 * 26
        dx.set((-ox / dist) * force)
        dy.set((-oy / dist) * force)
      } else {
        dx.set(0)
        dy.set(0)
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, dx, dy])

  return (
    <span className={`inline-block align-top ${masked ? 'overflow-hidden' : ''}`}>
      <motion.span
        variants={{
          hidden: { y: '115%', rotate: 6 },
          show: { y: '0%', rotate: 0, transition: { delay, duration: 0.9, ease: EXPO } },
        }}
        className="inline-block will-change-transform"
      >
        <motion.span
          ref={ref}
          style={{ x: dx, y: dy }}
          className={`inline-block will-change-transform ${className}`}
        >
          {ch}
        </motion.span>
      </motion.span>
    </span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Letters stay masked during the entrance, then the masks release so the
  // cursor-repel effect isn't clipped by their overflow-hidden wrappers.
  const [masked, setMasked] = useState(true)
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => setMasked(false), 2100)
    return () => clearTimeout(t)
  }, [ready])

  // Subtle depth on scroll for the text; the portrait stays pinned.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70])

  // one word per line — 'NITHIK' / 'DEVA.'
  const lines = HERO.name.split(' ')
  lines[lines.length - 1] += '.'
  let letterIndex = 0

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={ready ? 'show' : 'hidden'}
      className="mx-auto flex min-h-svh max-w-[1440px] flex-col justify-between px-6 pt-28 lg:px-16"
    >
      {/* meta row */}
      <motion.div
        style={{ y: textY }}
        className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2"
      >
        <div className="overflow-hidden">
          <motion.p
            variants={maskUp(0.05)}
            className="font-grotesk text-[13px] uppercase tracking-[0.3em] text-smoke lg:text-base"
          >
            {HERO.intro}
          </motion.p>
        </div>
        <div className="hidden overflow-hidden sm:block">
          <motion.p
            variants={maskUp(0.12)}
            className="font-grotesk text-[13px] uppercase tracking-[0.2em] text-ash"
          >
            {HERO.location}
          </motion.p>
        </div>
      </motion.div>

      {/* main split — stacked name + blurb left, full-height portrait right */}
      <div className="mt-8 grid flex-1 grid-cols-1 gap-x-8 lg:grid-cols-12">
        <motion.div
          style={{ y: textY }}
          className="flex flex-col justify-between lg:col-span-6"
        >
          <h1 className="font-display text-[clamp(4.25rem,16vw,15rem)] uppercase leading-[0.88] tracking-[0.01em]">
            {lines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line.split('').map((ch) => (
                  <Letter
                    key={letterIndex}
                    ch={ch}
                    delay={0.2 + letterIndex++ * 0.045}
                    masked={masked}
                    className={ch === '.' ? 'text-rust' : ''}
                  />
                ))}
              </span>
            ))}
          </h1>

          <div className="mt-10 pb-4 lg:pb-14">
            <motion.p variants={fadeUp(0.75)} className="max-w-[480px] leading-7 text-smoke">
              {HERO.blurb}
            </motion.p>
            <motion.div variants={fadeUp(0.9)} className="mt-10 flex items-center gap-5">
              <span className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-ash">
                Scroll
              </span>
              <span className="relative inline-block h-px w-16 overflow-hidden bg-line">
                {!reduce && (
                  <motion.span
                    className="absolute inset-y-0 w-6 bg-rust"
                    animate={{ x: [-24, 64] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 0.5,
                      delay: 2,
                    }}
                  />
                )}
              </span>
            </motion.div>
            <div className="mt-8 overflow-hidden sm:hidden">
              <motion.p
                variants={maskUp(1)}
                className="font-grotesk text-[13px] uppercase tracking-[0.2em] text-ash"
              >
                {HERO.location}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* portrait slot — clean monogram placeholder; real photo drops in later */}
        <motion.div
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
            show: {
              clipPath: 'inset(0% 0% 0% 0%)',
              transition: { delay: 0.5, duration: 1.2, ease: EXPO },
            },
          }}
          className="group relative mx-auto mt-8 aspect-[3/4] w-full max-w-[420px] border border-line lg:col-span-6 lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-full lg:max-w-none"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl uppercase leading-none text-ink/80 transition-colors duration-500 group-hover:text-rust lg:text-7xl">
              ND<span className="text-rust">.</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* baseline rule the portrait stands on */}
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { delay: 0.85, duration: 1.2, ease: EXPO } },
        }}
        className="h-px w-full origin-left bg-line"
      />
    </motion.section>
  )
}

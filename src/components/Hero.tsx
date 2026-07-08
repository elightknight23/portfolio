import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import { EXPO } from '../lib/anim'
import { useLeetCodeSolved } from '../lib/leetcode'
import { HERO, HERO_META, LINKS } from '../content'

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

/** Live LeetCode solved count — fades in as a fourth stat once fetched. */
function LeetCodeStat() {
  const solved = useLeetCodeSolved('elightknight23')
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (solved === null) return
    if (reduce) {
      setDisplay(solved)
      return
    }
    const controls = animate(0, solved, {
      duration: 1.4,
      ease: EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [solved, reduce])

  if (solved === null) return null

  return (
    <motion.a
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EXPO }}
      href={LINKS.leetcode}
      target="_blank"
      rel="noreferrer"
      data-cursor="link"
      className="lg:text-right"
    >
      <p className="font-display text-4xl leading-none text-ink lg:text-5xl">{display}</p>
      <p className="mt-2 font-grotesk text-[11px] uppercase tracking-[0.2em] text-ash">
        LeetCode Solved
      </p>
    </motion.a>
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

      {/* stacked name + blurb — full width; portrait slot returns later */}
      <div className="mt-8 flex flex-1 flex-col">
        <motion.div style={{ y: textY }} className="flex flex-1 flex-col justify-between">
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

          {/* bottom band — blurb + scroll cue left, links + hard numbers right */}
          <div className="mt-10 flex flex-col justify-between gap-12 pb-4 lg:flex-row lg:items-end lg:pb-14">
            <div className="max-w-[480px]">
              <motion.p variants={fadeUp(0.75)} className="leading-7 text-smoke">
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

            <motion.div variants={fadeUp(0.95)} className="flex flex-col gap-8 lg:items-end">
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {HERO_META.links.map(({ label, href, download }) => (
                  <a
                    key={label}
                    href={href}
                    {...(download
                      ? { download: 'Nithik_Deva_Resume.pdf' }
                      : { target: '_blank', rel: 'noreferrer' })}
                    data-cursor="link"
                    className="u-line font-grotesk text-sm uppercase tracking-[0.12em] text-ink"
                  >
                    {label} <span className="text-rust">↗</span>
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {HERO_META.stats.map(({ value, label }) => (
                  <div key={label} className="lg:text-right">
                    <p className="font-display text-4xl leading-none text-ink lg:text-5xl">
                      {value}
                    </p>
                    <p className="mt-2 font-grotesk text-[11px] uppercase tracking-[0.2em] text-ash">
                      {label}
                    </p>
                  </div>
                ))}
                <LeetCodeStat />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* baseline rule */}
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

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'motion/react'
import { EXPO } from '../lib/anim'
import { ROLES, type Role } from '../content'
import { useLenis } from '../lib/lenis'
import { Rule } from './Reveal'
import { SectionLabel } from './SectionLabel'

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function RoleHeader({ role, large = false }: { role: Role; large?: boolean }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
      <motion.div variants={item}>
        <h3 className={`text-ink ${large ? 'text-xl font-semibold lg:text-2xl' : 'text-base'}`}>
          {role.title}
        </h3>
        <p className="mt-1 font-grotesk uppercase tracking-[0.06em] text-rust">{role.company}</p>
      </motion.div>
      <motion.p variants={item} className="font-grotesk text-sm text-smoke lg:text-base">
        {role.period}
      </motion.p>
    </div>
  )
}

function RoleBullets({ role, large = false }: { role: Role; large?: boolean }) {
  return (
    <ul className={large ? 'mt-10 max-w-[760px] space-y-6' : 'mt-8 max-w-[672px] space-y-4'}>
      {role.bullets.map((bullet, i) => (
        <motion.li
          key={i}
          variants={item}
          className={`flex gap-4 text-smoke ${large ? 'text-lg leading-8' : 'leading-6'}`}
        >
          <span aria-hidden className="text-rust">
            •
          </span>
          <span>{bullet}</span>
        </motion.li>
      ))}
    </ul>
  )
}

/**
 * Desktop: the section pins for ~3 viewport-heights and scroll drives which
 * role is on stage — company menu on the left, details swapping in place on
 * the right. Clicking a company jumps the scroll to its segment.
 */
function PinnedExperience() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(ROLES.length - 1, Math.max(0, Math.floor(v * ROLES.length))))
  })

  const jumpTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    lenis?.scrollTo(top + ((i + 0.5) / ROLES.length) * scrollable, { duration: 1.2 })
  }

  return (
    <section id="experience" ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 h-svh">
        <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 pb-8 pt-24 lg:px-16">
          <Rule accent />
          <div className="mt-8">
            <SectionLabel index="01" text="Experience" />
          </div>

          {/* stage — menu left, active role right, both centered in the leftover height */}
          <div className="grid flex-1 grid-cols-12 items-center gap-8">
            <div className="col-span-4 flex flex-col gap-7">
              {ROLES.map((role, i) => (
                <button
                  key={role.company}
                  onClick={() => jumpTo(i)}
                  data-cursor="link"
                  className="group flex items-baseline gap-5 text-left"
                >
                  <span
                    className={`font-grotesk text-sm transition-colors duration-300 ${
                      i === active ? 'text-rust' : 'text-ash/60'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`font-display text-3xl uppercase leading-tight transition-colors duration-300 xl:text-4xl ${
                      i === active ? 'text-ink' : 'text-ash/40 group-hover:text-smoke'
                    }`}
                  >
                    {role.company}
                  </span>
                </button>
              ))}
            </div>
            <div className="relative col-span-8 min-h-[380px]">
              {ROLES.map((role, i) => (
                <motion.div
                  key={role.company}
                  initial={false}
                  animate={i === active ? 'show' : 'hidden'}
                  variants={{
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EXPO, staggerChildren: 0.07, delayChildren: 0.1 },
                    },
                    hidden: { opacity: 0, y: 28, transition: { duration: 0.3, ease: 'easeIn' } },
                  }}
                  className={i === active ? 'relative' : 'pointer-events-none absolute inset-x-0 top-0'}
                  aria-hidden={i !== active}
                >
                  <RoleHeader role={role} large />
                  <RoleBullets role={role} large />
                </motion.div>
              ))}
            </div>
          </div>

          {/* base bar — progress line + role counter anchor the bottom of the stage */}
          <div className="relative">
            <div className="h-px w-full bg-line/70" />
            <motion.div
              style={{ scaleX: railScale }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-rust"
            />
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-ash">
                Scroll to continue
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl leading-none text-ink">0{active + 1}</span>
                <span className="font-grotesk text-sm text-ash">/ 0{ROLES.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RoleCard({ role }: { role: Role }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
      className="border-b border-line pb-9"
    >
      <RoleHeader role={role} />
      <RoleBullets role={role} />
    </motion.article>
  )
}

/** Mobile / reduced-motion: the roles as a plain stacked list. */
function StackedExperience() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.4'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="experience" ref={ref} className="mx-auto max-w-[1440px] scroll-mt-20 px-6 lg:px-16">
      <Rule accent />
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <SectionLabel index="01" text="Experience" />
            <div className="relative hidden h-44 w-px bg-line/70 lg:block">
              <motion.div style={{ scaleY }} className="absolute inset-0 origin-top bg-rust" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-16 lg:col-span-8">
          {ROLES.map((role) => (
            <RoleCard key={role.company} role={role} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop && !reduce ? <PinnedExperience /> : <StackedExperience />
}

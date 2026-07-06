import { useRef } from 'react'
import { motion, useScroll, useSpring, type Variants } from 'motion/react'
import { EXPO } from '../lib/anim'
import { ROLES, type Role } from '../content'
import { Rule } from './Reveal'
import { SectionLabel } from './SectionLabel'

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
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
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <motion.div variants={item}>
          <h3 className="text-base text-ink">{role.title}</h3>
          <p className="mt-1 font-grotesk uppercase tracking-[0.06em] text-rust">{role.company}</p>
        </motion.div>
        <motion.p variants={item} className="font-grotesk text-sm text-smoke lg:text-base">
          {role.period}
        </motion.p>
      </div>
      <ul className="mt-8 max-w-[672px] space-y-4">
        {role.bullets.map((bullet, i) => (
          <motion.li key={i} variants={item} className="flex gap-4 leading-6 text-smoke">
            <span aria-hidden className="text-rust">
              •
            </span>
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}

export function Experience() {
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
            {/* scroll progress rail */}
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

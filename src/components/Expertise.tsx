import { motion, type Variants } from 'motion/react'
import { EXPO } from '../lib/anim'
import { EXPERTISE } from '../content'
import { FadeUp, Rule } from './Reveal'
import { SectionLabel } from './SectionLabel'

const column: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const entry: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO } },
}

export function Expertise() {
  return (
    <section id="skills" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 lg:px-16">
      <Rule accent />
      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionLabel index="03" text="Expertise" />
          <FadeUp delay={0.1}>
            <p className="mt-4 max-w-[320px] leading-6 text-smoke">{EXPERTISE.blurb}</p>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:col-span-8">
          {EXPERTISE.columns.map((col, colIndex) => (
            <motion.div
              key={col.heading}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
              variants={column}
              transition={{ delayChildren: colIndex * 0.12 }}
            >
              <motion.div variants={entry} className="border-b border-line pb-2">
                <h3 className="font-grotesk text-rust">{col.heading}</h3>
              </motion.div>
              <ul className="mt-6 space-y-2">
                {col.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={entry}
                    className="group relative text-2xl leading-9 text-ink transition-[padding] duration-300 hover:pl-9"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 origin-left scale-x-0 bg-rust transition-transform duration-300 group-hover:scale-x-100"
                    />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { EXPO } from '../lib/anim'
import { LINKS, PROJECTS, type Project } from '../content'
import { Masked, Rule } from './Reveal'
import { SectionLabel } from './SectionLabel'

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-6 w-6 ${className}`}
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

/** Border-framed card that tilts in 3D toward the cursor and inverts on hover. */
function ProjectCard({ project, order }: { project: Project; order: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 140, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 140, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 9)
    rotateX.set(((e.clientY - r.top) / r.height - 0.5) * -9)
  }
  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }
  const open = (e: React.MouseEvent) => {
    if ((e.target as Element).closest('a')) return
    window.open(project.live, '_blank', 'noopener')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EXPO, delay: order * 0.12 }}
      className="[perspective:1200px]"
    >
        <motion.div
          ref={ref}
          role="link"
          tabIndex={0}
          aria-label={`${project.title} — open live site`}
          data-cursor="view"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter') window.open(project.live, '_blank', 'noopener')
          }}
          style={{ rotateX, rotateY }}
          className="group flex h-full cursor-pointer flex-col justify-between border-2 border-ink bg-cream p-8 transition-colors duration-500 [transform-style:preserve-3d] hover:bg-panel lg:p-[50px]"
        >
          <div style={{ transform: 'translateZ(32px)' }}>
            <div className="flex items-center justify-between">
              <span className="font-grotesk text-rust">
                {project.index} / {project.domain}
              </span>
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                data-cursor="link"
                className="text-ink transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 group-hover:text-panel-fg"
              >
                <ArrowUpRight />
              </a>
            </div>
            <h3 className="mt-8 font-display text-[clamp(2.75rem,5vw,4rem)] uppercase leading-none text-ink transition-colors duration-500 group-hover:text-panel-fg">
              {project.title}
            </h3>
            <p className="mt-6 max-w-[448px] leading-6 text-smoke transition-colors duration-500 group-hover:text-panel-fg/70">
              {project.description}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4" style={{ transform: 'translateZ(20px)' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-steel px-[13px] py-[5px] font-grotesk text-sm text-ink transition-colors duration-500 group-hover:border-panel-fg/40 group-hover:text-panel-fg"
              >
                {tag}
              </span>
            ))}
          </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 lg:px-16">
      <Rule accent />
      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <SectionLabel index="02" text="Selected Works" />
        <Masked delay={0.1}>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="group font-grotesk uppercase tracking-[0.1em] text-rust"
          >
            View All Projects{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </Masked>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} order={i} />
        ))}
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { EXPO } from '../lib/anim'
import { LINKS } from '../content'
import { useLenis } from '../lib/lenis'
import { Magnetic } from './Magnetic'
import { ThemeToggle } from './ThemeToggle'

const ITEMS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
]

export function Nav({ ready }: { ready: boolean }) {
  const lenis = useLenis()
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 240)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const { id } of ITEMS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    lenis?.scrollTo(`#${id}`, { offset: -76, duration: 1.4 })
  }
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault()
    lenis?.scrollTo(0, { duration: 1.4 })
  }

  return (
    <motion.header
      initial={{ y: '-110%' }}
      animate={{ y: ready && !hidden ? '0%' : '-110%' }}
      transition={{ duration: 0.55, ease: EXPO }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-cream/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 lg:px-16">
        <a
          href="#"
          onClick={toTop}
          data-cursor="link"
          className="font-display text-base uppercase tracking-[-0.05em]"
        >
          Nithik Deva
        </a>
        <nav className="flex items-center gap-8">
          <div className="hidden items-center gap-8 md:flex">
            {ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                data-cursor="link"
                className={`u-line font-grotesk text-sm uppercase tracking-[0.12em] transition-colors duration-300 ${
                  active === id ? 'font-bold text-rust' : 'text-smoke hover:text-ink'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
          <ThemeToggle />
          <Magnetic strength={0.25}>
            <a
              href={LINKS.mailto}
              data-cursor="link"
              className="block border-2 border-ink px-6 py-2 font-grotesk text-sm uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-panel hover:text-panel-fg"
            >
              Hire Me
            </a>
          </Magnetic>
        </nav>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-rust"
      />
    </motion.header>
  )
}

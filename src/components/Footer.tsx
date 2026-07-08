import { useEffect, useState } from 'react'
import { FOOTER, LINKS } from '../content'
import { useLenis } from '../lib/lenis'

const SOCIALS = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'LeetCode', href: LINKS.leetcode },
  { label: 'Email', href: LINKS.mailto },
]

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Kolkata',
})

/** Live clock pinned to Hyderabad — my time, not the visitor's. */
function LocalTime() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 10_000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="font-grotesk text-sm uppercase tracking-[0.12em] text-smoke">
      Hyderabad — {time} IST
    </p>
  )
}

export function Footer() {
  const lenis = useLenis()
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault()
    lenis?.scrollTo(0, { duration: 1.4 })
  }

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-16">
        <div className="flex flex-col gap-1">
          <p className="font-grotesk text-sm text-ink lg:text-base">{FOOTER.note}</p>
          <LocalTime />
        </div>
        <div className="flex items-center gap-8">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              data-cursor="link"
              className="u-line font-grotesk text-smoke transition-colors duration-300 hover:text-ink"
            >
              {label}
            </a>
          ))}
          <a
            href="#"
            onClick={toTop}
            data-cursor="link"
            aria-label="Back to top"
            className="u-line font-grotesk uppercase tracking-[0.12em] text-ink"
          >
            Top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

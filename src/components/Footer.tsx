import { FOOTER, LINKS } from '../content'

const SOCIALS = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Email', href: LINKS.mailto },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-16">
        <p className="font-grotesk text-sm text-ink lg:text-base">{FOOTER.note}</p>
        <div className="flex gap-8">
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
        </div>
      </div>
    </footer>
  )
}

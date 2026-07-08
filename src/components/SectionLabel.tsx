import { Scramble } from './Scramble'

/**
 * Section heading with editorial depth: a huge faint index numeral ghosted
 * behind a small rust eyebrow + scrambling title. `text-ink` at ~5% renders as
 * a faint dark ghost on light and a faint light ghost on dark — correct in both
 * themes with no extra token.
 */
export function SectionLabel({
  index,
  text,
  className = '',
}: {
  index: string
  text: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 -top-12 select-none font-display text-[8rem] leading-none text-ink/[0.05] lg:-top-16 lg:text-[11rem]"
      >
        {index}
      </span>
      <div className="relative">
        <span className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-rust">
          ({index})
        </span>
        <h2 className="mt-2 font-display text-base uppercase tracking-[0.05em]">
          <Scramble text={text} />
        </h2>
      </div>
    </div>
  )
}

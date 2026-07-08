import { EDUCATION, HONORS, OFF_CLOCK } from '../content'
import { FadeUp, Rule } from './Reveal'
import { Scramble } from './Scramble'
import { SectionLabel } from './SectionLabel'

export function EducationHonors() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-16">
      <Rule accent />
      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
        <div>
          <SectionLabel index="04" text="Education" />
          <FadeUp delay={0.1}>
            <div className="mt-8 space-y-2">
              <h3 className="text-ink">{EDUCATION.school}</h3>
              <p className="text-smoke">{EDUCATION.degree}</p>
              <p className="font-grotesk text-rust">{EDUCATION.meta}</p>
            </div>
          </FadeUp>
        </div>
        <div>
          <h2 className="font-display text-base uppercase tracking-[0.05em]">
            <Scramble text="Honors" />
          </h2>
          <div className="mt-8 space-y-6">
            {HONORS.map((honor, i) => (
              <FadeUp key={honor.title} delay={0.08 * (i + 1)}>
                <div className="flex gap-4">
                  <span className="font-grotesk text-rust">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-bold text-ink">{honor.title}</p>
                    <p className="text-smoke">{honor.detail}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* the person behind the resume */}
      <div className="mt-20 lg:mt-24">
        <Rule />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="font-display text-base uppercase tracking-[0.05em]">
              <Scramble text="Off the Clock" />
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FadeUp>
              <p className="max-w-[576px] leading-6 text-smoke">{OFF_CLOCK.blurb}</p>
            </FadeUp>
            {/* photo strip — placeholder frames; drop an <img> into each
                frame's picture area when the real photos are picked */}
            <div className="mt-10 flex gap-5 overflow-x-auto pb-4 lg:overflow-visible lg:pb-0">
              {OFF_CLOCK.tags.map((tag, i) => (
                <FadeUp key={tag} delay={0.08 + i * 0.07} className="shrink-0">
                  <div
                    className={`group w-36 border border-line bg-cream p-2 pb-3 transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 lg:w-40 ${
                      i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[1.75deg]'
                    }`}
                  >
                    <div className="flex aspect-[3/4] items-center justify-center bg-surface">
                      <span className="select-none font-display text-4xl text-ink/[0.08] transition-colors duration-500 group-hover:text-rust/30">
                        0{i + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-center font-grotesk text-[10px] uppercase tracking-[0.2em] text-ash">
                      {tag}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { CONTACT, LINKS } from '../content'
import { VelocityMarquee } from './Marquee'
import { Magnetic } from './Magnetic'
import { FadeUp, Masked } from './Reveal'

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-panel py-32 text-panel-fg lg:py-40">
      {/* velocity-reactive marquee floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-2.5rem] opacity-10">
        <VelocityMarquee baseVelocity={-2}>
          <span className="block font-display text-[clamp(7rem,16vw,12.5rem)] uppercase leading-none text-steel">
            {CONTACT.marquee}&nbsp;•&nbsp;
          </span>
        </VelocityMarquee>
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-6 lg:px-16">
        <div className="flex flex-col items-center gap-6">
          <Masked>
            <p className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-rust">
              {CONTACT.eyebrow}
            </p>
          </Masked>
          <h2 className="text-center font-display text-[clamp(2.75rem,7vw,4.5rem)] uppercase leading-[1.05]">
            {CONTACT.heading.map((line, i) => (
              <Masked key={line} delay={0.1 + i * 0.1}>
                <span className="block">
                  {line.endsWith('.') ? (
                    <>
                      {line.slice(0, -1)}
                      <span className="text-rust">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </Masked>
            ))}
          </h2>
        </div>
        <FadeUp delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
            <Magnetic strength={0.3}>
              <a
                href={LINKS.mailto}
                data-cursor="link"
                className="block border-b-4 border-rust pb-1 transition-colors duration-300 hover:text-rust"
              >
                {LINKS.email}
              </a>
            </Magnetic>
            <span aria-hidden className="hidden opacity-50 sm:inline">
              •
            </span>
            <Magnetic strength={0.3}>
              <a
                href={LINKS.resume}
                download="Nithik_Deva_Resume.pdf"
                data-cursor="link"
                className="u-line block font-grotesk uppercase tracking-[0.1em]"
              >
                Download Resume
              </a>
            </Magnetic>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

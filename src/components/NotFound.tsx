import { useEffect } from 'react'
import { motion } from 'motion/react'
import { EXPO } from '../lib/anim'
import { Cursor } from './Cursor'
import { Grain } from './Grain'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: EXPO },
})

/** Themed 404 — served for any path that isn't the homepage. */
export function NotFound() {
  useEffect(() => {
    document.title = '404 — Nithik Deva'
  }, [])

  return (
    <>
      <Cursor />
      <Grain />
      <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
        <motion.p
          {...fadeUp(0.1)}
          className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-rust"
        >
          (Lost)
        </motion.p>
        <motion.h1
          {...fadeUp(0.2)}
          className="font-display text-[clamp(6rem,24vw,16rem)] leading-none text-ink"
        >
          4<span className="text-rust">0</span>4
        </motion.h1>
        <motion.p {...fadeUp(0.35)} className="max-w-[420px] leading-7 text-smoke">
          This page never reconciled — it isn’t in the ledger. Let’s get you back to balance.
        </motion.p>
        <motion.div {...fadeUp(0.5)}>
          <a
            href="/"
            data-cursor="link"
            className="inline-block border-2 border-ink px-8 py-3 font-grotesk text-sm uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:bg-panel hover:text-panel-fg"
          >
            Back to the site
          </a>
        </motion.div>
      </main>
    </>
  )
}

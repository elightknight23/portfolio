import { useEffect } from 'react'
import { motion } from 'motion/react'
import { EXPO } from '../lib/anim'

const NAME = 'NITHIK DEVA'

/** Opening curtain: name staggers in over ink, then the whole panel lifts away. */
export function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1700)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: EXPO }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-panel"
    >
      <div className="flex overflow-hidden font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-none text-panel-fg">
        {NAME.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.12 + i * 0.04, duration: 0.7, ease: EXPO }}
            className="inline-block"
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.35, duration: 1.1, ease: EXPO }}
        className="h-px w-56 origin-left bg-rust"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="font-grotesk text-xs uppercase tracking-[0.35em] text-ash"
      >
        Portfolio — 2026
      </motion.p>
    </motion.div>
  )
}

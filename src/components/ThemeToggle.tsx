import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EXPO } from '../lib/anim'
import { useTheme } from '../lib/theme'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden className="h-full w-full">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-full w-full">
      <path d="M20 14.4A8 8 0 1 1 9.6 4 6.3 6.3 0 0 0 20 14.4Z" />
    </svg>
  )
}

/** Light/dark toggle for the nav. Shows the icon of the theme you'll switch TO. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const reduce = useReducedMotion()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="link"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="relative grid h-9 w-9 place-items-center text-ink transition-colors duration-300 hover:text-rust"
    >
      <span className="relative block h-[18px] w-[18px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={theme}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.4 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.4 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EXPO }}
            className="absolute inset-0"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#/\\_+<>*'

// Labels inside the first viewport intersect at mount, while the preloader
// curtain still covers the page — hold those flickers until it lifts.
const BOOT = performance.now()
const PRELOADER_MS = 2300

/**
 * Text that flickers through random glyphs and settles left-to-right when it
 * scrolls into view. Layout-stable: renders the final text invisibly to
 * reserve exact width, with the scrambling copy layered on top.
 */
export function Scramble({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? text : '')

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(text)
      return
    }
    let frame = 0
    let id: ReturnType<typeof setInterval> | undefined
    const REVEAL_EVERY = 2 // frames per locked-in character
    const start = () => {
      id = setInterval(() => {
        frame++
        const settled = Math.floor(frame / REVEAL_EVERY)
        setDisplay(
          text
            .split('')
            .map((ch, i) => {
              if (ch === ' ' || i < settled) return ch
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join(''),
        )
        if (settled >= text.length) clearInterval(id)
      }, 32)
    }
    const wait = setTimeout(start, Math.max(0, PRELOADER_MS - (performance.now() - BOOT)))
    return () => {
      clearTimeout(wait)
      clearInterval(id)
    }
  }, [inView, reduce, text])

  return (
    <span ref={ref} className={`relative inline-block whitespace-pre ${className}`} aria-label={text}>
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0">
        {display}
      </span>
    </span>
  )
}

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

type Variant = 'default' | 'link' | 'view'

/**
 * Custom cursor: a tight dot, a lagging ring (both blend-mode difference so they
 * invert against light and dark sections), and a filled "OPEN" badge over
 * project cards. Elements opt in via data-cursor="link" | "view".
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState<Variant>('default')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.7 })
  const ringY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.7 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: Event) => {
      const target = (e.target as Element).closest?.('[data-cursor]')
      setVariant((target?.getAttribute('data-cursor') as Variant) ?? 'default')
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* dot */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{ scale: variant === 'view' ? 0 : 1, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-white"
        />
      </motion.div>
      {/* ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: variant === 'link' ? 1.9 : variant === 'view' ? 0 : 1,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border border-white"
        />
      </motion.div>
      {/* view badge */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <motion.div
          animate={{ scale: variant === 'view' && visible ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="-ml-12 -mt-12 flex h-24 w-24 items-center justify-center rounded-full bg-rust font-grotesk text-xs tracking-[0.25em] text-panel-fg"
        >
          OPEN&nbsp;↗
        </motion.div>
      </motion.div>
    </>
  )
}

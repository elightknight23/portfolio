import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children, paused }: { children: ReactNode; paused: boolean }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf = requestAnimationFrame(function loop(time: number) {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    })
    setLenis(instance)
    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
  }, [lenis, paused])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { LenisProvider } from './lib/lenis'
import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Statement } from './components/Statement'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Expertise } from './components/Expertise'
import { EducationHonors } from './components/EducationHonors'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  // Skip the preloader entirely for reduced-motion users.
  const [loading, setLoading] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const ready = !loading

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <LenisProvider paused={loading}>
      <Cursor />
      <Grain />
      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <div className="mt-24 space-y-24 lg:mt-40 lg:space-y-40">
          <Statement />
          <Experience />
          <Projects />
        </div>
        {/* tonal band breaks up the scroll before the dark contact section */}
        <div className="mt-24 bg-surface py-24 lg:mt-40 lg:py-32">
          <div className="space-y-24 lg:space-y-40">
            <Expertise />
            <EducationHonors />
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  )
}

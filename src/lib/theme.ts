import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const META = { light: '#fcf9f8', dark: '#12100f' } as const

/** The theme already committed to <html> by the no-FOUC script in index.html. */
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', META[theme])
}

/**
 * Theme state synced to <html data-theme>. First visit follows the OS
 * preference (already resolved pre-paint by the inline script); once the user
 * toggles, the choice is persisted and the OS listener stops overriding it.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Follow the system preference only until the user makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return
      const next: Theme = e.matches ? 'dark' : 'light'
      apply(next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    apply(next)
    localStorage.setItem(STORAGE_KEY, next)
    setTheme(next)
  }

  return { theme, toggle }
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anton/400.css'
import '@fontsource-variable/space-grotesk/index.css'
import '@fontsource-variable/libre-franklin/index.css'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.tsx'
import { NotFound } from './components/NotFound.tsx'

// Single-page site: anything that isn't the root path gets the themed 404.
// (Requires the host to rewrite unknown paths to index.html, e.g. Vercel SPA config.)
const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html'

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isHome ? <App /> : <NotFound />}</StrictMode>,
)

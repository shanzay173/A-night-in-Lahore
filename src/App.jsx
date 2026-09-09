import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Streets from './pages/Streets'
import Taste from './pages/Taste'
import Heritage from './pages/Heritage'
import End from './pages/End'
import './index.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    html.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
    html.style.scrollBehavior = prev
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streets" element={<Streets />} />
        <Route path="/taste" element={<Taste />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </Layout>
  )
}

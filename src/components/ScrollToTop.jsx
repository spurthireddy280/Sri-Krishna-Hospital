/**
 * ScrollToTop — Floating button that appears on scroll
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 250 }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-7 right-7 z-[500] w-12 h-12 rounded-full bg-gradient-to-br from-navy-500 to-teal-500 text-white grid place-items-center shadow-[0_6px_24px_rgba(20,184,166,0.3)] cursor-pointer hover:-translate-y-1 hover:scale-110 hover:shadow-[0_10px_36px_rgba(20,184,166,0.4)] transition-all duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

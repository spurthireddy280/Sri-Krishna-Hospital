/**
 * Navbar — Sticky with glassmorphism on scroll, mobile drawer
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const links = [
  { label: 'Home', href: 'home' },
  { label: 'Health Packages', href: 'packages' },
  { label: 'Our Doctors', href: 'doctors' },
  { label: 'Services', href: 'services' },
  { label: 'Insurance', href: 'insurance' },
  { label: 'Media Room', href: '/media-room', isRoute: true },
  { label: 'Blogs', href: 'contact' },
  { label: 'Contact Us', href: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Automatically scroll to hash after navigation
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) {
          const offset = 80
          const y = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
    } else {
      const el = document.querySelector(`#${id}`)
      if (el) {
        const offset = 80
        const y = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      className={`sticky top-0 z-[999] transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/90 backdrop-blur-2xl shadow-lg shadow-black/[0.04] border-black/[0.06]'
          : 'bg-white/70 backdrop-blur-xl border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[68px] transition-all">
        {/* Logo */}
        <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 shrink-0 group">
          <img
            src="/logo.jpg"
            alt="Sri Krishna Neuro Super Speciality Hospital Logo"
            className="w-11 h-11 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="leading-tight">
            <div className="font-bold text-[0.92rem] text-slate-900 tracking-tight">Sri Krishna Hospital</div>
            <div className="text-[0.62rem] font-semibold text-teal-600 uppercase tracking-[0.1em]">Neuro & Multi Speciality</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-0.5">
          {links.map((link) => (
            <li key={link.label}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  className="relative px-3.5 py-2 text-[0.84rem] font-medium text-slate-500 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-all whitespace-nowrap group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-r from-navy-500 to-teal-500 rounded-full transition-all duration-300" />
                </Link>
              ) : (
                <a
                  href={`/#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-3.5 py-2 text-[0.84rem] font-medium text-slate-500 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-all whitespace-nowrap group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-r from-navy-500 to-teal-500 rounded-full transition-all duration-300" />
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/book-appointment"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-navy-500 to-teal-500 text-white font-semibold text-[0.84rem] rounded-full shadow-lg shadow-teal-500/25 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
          >
            <CalendarIcon />
            Book Appointment
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 flex flex-col gap-[5px] z-[1100]"
            aria-label="Toggle menu"
          >
            <span className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-transform origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-transform origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[300px] h-full bg-white z-[1050] shadow-2xl p-8 pt-24 overflow-y-auto"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-slate-600 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-all font-medium"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={`/#${link.href}`}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block px-4 py-3 text-slate-600 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-all font-medium"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.li>
                ))}
                <li className="mt-4">
                  <Link
                    to="/book-appointment"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-navy-500 to-teal-500 text-white font-semibold rounded-full shadow-lg"
                  >
                    <CalendarIcon /> Book Appointment
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

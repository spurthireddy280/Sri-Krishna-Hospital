/**
 * Hero — Full-height immersive section with slider, parallax zoom, search, animated stats
 */
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

import { Link, useNavigate } from 'react-router-dom'

const slides = [
  { src: '/sri-krishna-hospital.jpg', alt: 'Sri Krishna Neuro Super Speciality Hospital building' },
  { src: '/operating-theater.png', alt: 'Advanced neurosurgery operating theater' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80', alt: 'Compassionate patient care' },
]

const stats = [
  { value: 25, label: 'Years of Trust' },
  { value: 50000, label: 'Surgeries Done' },
  { value: 85, label: 'Expert Doctors' },
  { value: 200, label: 'Beds Available' },
]

/* Searchable dataset */
const searchData = [
  // Doctors
  { label: 'Dr. Anil Kumar — Chief Neurosurgeon', type: 'Doctor', action: 'route', target: '/book-appointment' },
  { label: 'Dr. Priya Sharma — Consultant Cardiologist', type: 'Doctor', action: 'route', target: '/book-appointment' },
  { label: 'Dr. Rajesh Verma — Senior Orthopedic Surgeon', type: 'Doctor', action: 'route', target: '/book-appointment' },
  { label: 'Dr. Meera Iyer — Consultant Neurologist', type: 'Doctor', action: 'route', target: '/book-appointment' },
  { label: 'Dr Aniket S Phutane — Neurosciences', type: 'Doctor', action: 'route', target: '/book-appointment' },
  { label: 'Dr P Vijay Anand Reddy — Oncology', type: 'Doctor', action: 'route', target: '/book-appointment' },
  { label: 'Dr Pratap Chandra Rath — Cardiology', type: 'Doctor', action: 'route', target: '/book-appointment' },
  { label: 'Dr Somasekhar M — Nephrology', type: 'Doctor', action: 'route', target: '/book-appointment' },
  // Health Packages
  { label: 'Senior Citizen Package — ₹5,000', type: 'Package', action: 'scroll', target: 'packages' },
  { label: 'Master Cardiac Package — ₹5,000', type: 'Package', action: 'scroll', target: 'packages' },
  { label: 'Basic Cardiac Package — ₹2,500', type: 'Package', action: 'scroll', target: 'packages' },
  { label: 'Routine Health Checkup — ₹900', type: 'Package', action: 'scroll', target: 'packages' },
  { label: 'Diabetic Health Checkup — ₹1,200', type: 'Package', action: 'scroll', target: 'packages' },
  { label: 'Renal Package — ₹1,200', type: 'Package', action: 'scroll', target: 'packages' },
  // Services
  { label: 'Cardiology', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Neurology', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Neurosurgery', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Nephrology', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Urology', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Orthopedics', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Pediatrics & Neonatology', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'General Medicine', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'General Surgery', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Plastic Surgery', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Critical Care', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'CT Scanning', type: 'Service', action: 'scroll', target: 'services' },
  { label: '2D Echo', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Dialysis', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Physiotherapy', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Ambulance', type: 'Service', action: 'scroll', target: 'services' },
  { label: 'Pharmacy', type: 'Service', action: 'scroll', target: 'services' },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const sectionRef = useRef(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter results
  const query = searchQuery.trim().toLowerCase()
  const filteredResults = query.length >= 2
    ? searchData.filter(item => item.label.toLowerCase().includes(query))
    : []

  // Group results by type
  const groupedResults = {}
  filteredResults.forEach(item => {
    if (!groupedResults[item.type]) groupedResults[item.type] = []
    groupedResults[item.type].push(item)
  })

  const handleResultClick = (item) => {
    setSearchQuery('')
    setShowResults(false)
    if (item.action === 'route') {
      navigate(item.target)
    } else {
      const el = document.querySelector(`#${item.target}`)
      if (el) {
        const offset = 80
        const y = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  const handleSearchSubmit = () => {
    if (filteredResults.length > 0) {
      handleResultClick(filteredResults[0])
    }
  }

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
      {/* Background Slider with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              i === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover animate-slow-zoom"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </motion.div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-950/60 via-navy-950/25 to-navy-950/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />

      {/* Ambient Glows */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-navy-500/20 rounded-full blur-[120px] z-[2] animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[100px] z-[2] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 w-full py-36 lg:py-40">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full glass text-teal-300 text-xs font-semibold tracking-wide"
            >
              <span className="w-7 h-7 rounded-full bg-teal-500/20 grid place-items-center">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              NABL Accredited · NABH Certified
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Sri Krishna
              <br />
              <span className="text-gradient">Neuro Super Speciality</span>
              <br />
              Hospital.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed"
            >
              Where world-class neurology meets compassionate multispecialty care.
              Experience advanced medical expertise backed by cutting-edge technology and a legacy of trust.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/book-appointment" className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-teal-500 to-navy-500 text-white font-bold rounded-full shadow-[0_8px_30px_rgba(20,184,166,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_14px_40px_rgba(20,184,166,0.35)] transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book Appointment
              </Link>
              <a href="#about" className="inline-flex items-center gap-2.5 px-7 py-4 text-white font-semibold rounded-full border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                Watch Our Story
              </a>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-xl relative"
              ref={searchRef}
            >
              <div className="flex items-center gap-3 px-5 py-1.5 rounded-2xl glass transition-all focus-within:border-teal-400/50 focus-within:bg-white/10">
                <svg className="w-5 h-5 text-white/35 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Search doctors, services, or health packages..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true) }}
                  onFocus={() => { if (searchQuery.trim().length >= 2) setShowResults(true) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit() }}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm py-3.5 placeholder:text-white/30"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-navy-500 text-white font-semibold text-sm rounded-xl hover:scale-[1.04] hover:shadow-lg hover:shadow-teal-500/25 transition-all whitespace-nowrap"
                >
                  Find Now
                </button>
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showResults && query.length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-[320px] overflow-y-auto"
                  >
                    {filteredResults.length === 0 ? (
                      <div className="px-5 py-6 text-center text-slate-400 text-sm">
                        No results found for "<span className="font-semibold text-slate-600">{searchQuery}</span>"
                      </div>
                    ) : (
                      Object.entries(groupedResults).map(([type, items]) => (
                        <div key={type}>
                          <div className="px-4 py-2 bg-slate-50 text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                            {type === 'Doctor' ? '👨‍⚕️ Doctors' : type === 'Package' ? '📦 Health Packages' : '🏥 Services'}
                          </div>
                          {items.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleResultClick(item)}
                              className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0"
                            >
                              <svg className="w-4 h-4 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                              {item.label}
                            </button>
                          ))}
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/[0.07]"
            >
              {stats.map((stat) => (
                <CounterStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
              i === currentSlide
                ? 'bg-teal-400 border-teal-400 scale-125'
                : 'bg-transparent border-white/30 hover:border-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

/** Animated counter stat */
function CounterStat({ value, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2200
          const start = performance.now()
          const ease = (t) => 1 - Math.pow(1 - t, 4)

          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            setCount(Math.round(ease(p) * value))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref}>
      <div className="font-serif text-[2.2rem] font-bold text-white leading-none mb-1">
        {count.toLocaleString()}<span className="text-teal-400">+</span>
      </div>
      <div className="text-[0.72rem] text-white/40 font-medium uppercase tracking-[0.15em]">
        {label}
      </div>
    </div>
  )
}

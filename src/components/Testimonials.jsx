/**
 * Testimonials — Animated carousel with 3D tilt cards, dots, navigation
 */
import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    text: 'My father had a complex brain tumor and we were terrified. Dr. Anil Kumar and his team performed a flawless surgery. The recovery was faster than we ever expected. This hospital saved my father\'s life, and for that, we will be forever grateful.',
    name: 'Ramesh Patel',
    detail: 'Son of Brain Tumor Surgery Patient',
  },
  {
    text: 'After suffering from severe spinal pain for years, I found relief at Sri Krishna Hospital. Dr. Rajesh Verma\'s expertise in spine surgery was remarkable. The care from admission to discharge was top-notch and surprisingly affordable.',
    name: 'Lakshmi Devi',
    detail: 'Spinal Surgery Recovery Patient',
  },
  {
    text: 'The cardiac team led by Dr. Priya Sharma is absolutely world-class. My heart bypass surgery was handled with such precision and warmth. The entire nursing staff was phenomenal. I felt like family, not just a patient.',
    name: 'Mohammed Irfan',
    detail: 'Cardiac Bypass Surgery Patient',
  },
  {
    text: 'My mother was diagnosed with epilepsy, and Dr. Meera Iyer\'s treatment plan was nothing short of life-changing. She went from multiple seizures a week to being seizure-free for over a year. We\'ve found our family hospital forever.',
    name: 'Sneha Rao',
    detail: 'Daughter of Epilepsy Treatment Patient',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % reviews.length), 7000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((p) => (p - 1 + reviews.length) % reviews.length)
  const next = () => setCurrent((p) => (p + 1) % reviews.length)

  return (
    <section
      id="testimonials"
      className="py-28 lg:py-32 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(20,184,166,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.04) 0%, transparent 50%), white',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-5" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-teal-600 px-5 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-4">
            Patient Stories
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-slate-900 tracking-tight mb-3">
            What Our Patients Say
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Real stories of recovery, compassion, and renewed hope from the families we've served.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <TestiCard review={reviews[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 grid place-items-center text-slate-500 shadow-sm hover:bg-gradient-to-br hover:from-navy-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:scale-110 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-7 bg-gradient-to-r from-navy-500 to-teal-500'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 grid place-items-center text-slate-500 shadow-sm hover:bg-gradient-to-br hover:from-navy-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:scale-110 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Individual testimonial card with 3D tilt */
function TestiCard({ review }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState('')

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setTilt(`perspective(1200px) rotateY(${x * 6}deg) rotateX(${y * -5}deg)`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt('')}
      className="relative bg-white border border-slate-100 rounded-3xl p-12 shadow-xl text-center"
      style={{ transform: tilt, transition: 'transform 0.12s ease-out' }}
    >
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-navy-500 to-teal-500 rounded-t-3xl" />

      {/* Stars */}
      <div className="flex justify-center gap-1 mb-7">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 fill-amber-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
        ))}
      </div>

      {/* Quote mark */}
      <div className="font-serif text-6xl leading-none text-gradient opacity-40 mb-[-8px]">&ldquo;</div>

      <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
        {review.text}
      </p>

      <div className="font-serif font-bold text-lg text-slate-900">{review.name}</div>
      <div className="text-sm text-slate-400 mt-1">{review.detail}</div>
    </div>
  )
}

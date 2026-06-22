/**
 * About — Split layout with scroll-triggered animations and floating badge
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  'Advanced Neuro Care',
  'Expert Specialists',
  'Modern Technology',
  'Compassionate Care',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-5" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative ring */}
            <div className="absolute -top-8 -left-8 w-28 h-28 border-2 border-dashed border-teal-200/50 rounded-full z-0" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-[2] group">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                alt="Modern hospital lobby"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="absolute -bottom-6 -right-6 z-[3] bg-white rounded-2xl p-5 shadow-xl border border-slate-100 flex items-center gap-4 animate-float"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-navy-500 grid place-items-center text-white shadow-lg shadow-teal-500/25">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-slate-900 leading-none">25+</div>
                <div className="text-xs text-slate-500 font-medium">Years of Excellence</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-gradient-to-r from-teal-500 to-navy-500 rounded-full" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-600">About Our Hospital</span>
            </div>

            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-slate-900 leading-tight tracking-tight mb-5">
              Committed to World-Class Neurological & Multispecialty Care
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Sri Krishna Neuro and Multi Speciality Hospital stands as a beacon of advanced healthcare in the heart of Hyderabad. Our unwavering commitment to excellence in neurological and multispecialty care has earned us the trust of over 50,000 patients and families.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              With state-of-the-art infrastructure, a team of renowned specialists, and a patient-first approach, we deliver comprehensive care that meets the highest international standards — all with the warmth and compassion that defines our legacy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-teal-200 hover:-translate-y-0.5 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-br from-teal-500 to-navy-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{feat}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

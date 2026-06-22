/**
 * Founder — Visionary section with portrait, quote, and bio
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Founder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-28 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-5" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-teal-600 px-5 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-4">
            Founder's Desk
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-slate-900 tracking-tight mb-3">
            The Visionary Behind Our Mission
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            A legacy of healing, built on decades of devotion to patient care and medical innovation.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-center bg-white rounded-3xl p-10 lg:p-12 shadow-xl border border-slate-100 overflow-hidden"
        >
          {/* Gradient top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-500 to-teal-500" />

          {/* Portrait */}
          <div className="relative">
            <img
              src="/founder.png"
              alt="Dr. Krishna Reddy — Founder & Chief Neurosurgeon"
              className="w-full h-[420px] object-cover object-top rounded-2xl shadow-lg"
            />
          </div>

          {/* Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">Dr. Krishna Reddy</h3>
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-[0.12em] mb-6">
              Founder & Chief Neurosurgeon
            </p>

            {/* Quote */}
            <blockquote className="relative py-5 px-6 bg-gradient-to-br from-navy-50 to-teal-50 border-l-[3px] border-teal-500 rounded-r-xl mb-6">
              <span className="absolute top-0 left-3 font-serif text-5xl text-teal-300/40 leading-none">&ldquo;</span>
              <p className="font-serif text-base italic text-navy-800 leading-relaxed">
                Every patient who walks through our doors deserves not just the best medical care, but the dignity, respect, and compassion that healing demands. This hospital is built on that promise — and every day, we renew it.
              </p>
            </blockquote>

            <p className="text-[0.92rem] text-slate-500 leading-relaxed">
              Dr. Krishna Reddy founded Sri Krishna Neuro and Multi Speciality Hospital in 2001 with a singular vision — to make world-class neurological care accessible to every family. With over 30 years of surgical experience, 15,000+ successful neurosurgeries, and fellowships from leading global institutions, Dr. Reddy has established the hospital as the region's most trusted name in advanced healthcare.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

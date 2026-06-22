/**
 * Insurance — Infinite horizontal scrolling marquee of insurance partners
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const partners = [
  '⭐ Star Health Insurance',
  '🛡️ HDFC ERGO',
  '🏥 ICICI Lombard',
  '🇮🇳 New India Assurance',
  '💙 Bajaj Allianz',
  '❤️ Niva Bupa',
  '🌿 Care Health',
  '🔵 Tata AIG',
  '🏛️ United India',
  '🌟 Aditya Birla Health',
  '🏥 ManipalCigna',
  '💚 Religare Health',
]

export default function Insurance() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section id="insurance" className="py-24 lg:py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-teal-600 px-5 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-4">
            Insurance Partners
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-slate-900 tracking-tight mb-3">
            Accepted Insurance Providers
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            We partner with all major insurance providers to make quality healthcare accessible.
          </p>
        </motion.div>
      </div>

      {/* Marquee with edge masks */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex gap-6 w-max animate-marquee">
          {/* Double the items for seamless infinite loop */}
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[190px] h-16 px-7 bg-white border border-slate-100 rounded-xl text-slate-400 font-bold text-sm whitespace-nowrap hover:text-navy-600 hover:border-navy-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default select-none"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

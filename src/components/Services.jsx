/**
 * Services — Clinical, Diagnosis, and Support services
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const servicesData = [
  {
    title: 'Clinical Scope of Services',
    icon: '🏥',
    color: 'from-blue-500 to-navy-600',
    bgColor: 'bg-blue-50',
    items: [
      'Cardiology', 'Neurology', 'Neurosurgery', 'Nephrology', 'Urology',
      'Gynaec & Obstetrician', 'Pediatrics & Neonatology', 'General Medicine',
      'General Surgery', 'Radiology', 'Orthopedics', 'Plastic Surgery',
      'Vascular Surgery', 'Critical Care', 'Anesthesiology', 'Pathology', 'ENT'
    ]
  },
  {
    title: 'Diagnosis & Laboratory Services',
    icon: '🔬',
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50',
    items: [
      'CT Scanning', '2D Echo', 'TMT', 'Digital X-Ray', 'Ultra Sound',
      'EEG & NCS', 'ECG', 'EMG', 'Spirometry', 'Cathlab',
      'Clinical Biochemistry', 'Clinical Microbiology & Serology',
      'Clinical Pathology', 'Cytopathology', 'Haematology'
    ]
  },
  {
    title: 'Support Services',
    icon: '🤝',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    items: [
      'Dialysis', 'Nutrition & Dietetics', 'Physiotherapy', 'Ambulance',
      'Pharmacy', 'Nursing Care', 'House Keeping', 'Security', 'Canteen'
    ]
  }
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" className="py-28 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-teal-600 px-5 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-4">
            Comprehensive Care
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-slate-900 tracking-tight mb-3">
            Our Scope of Services
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Providing a complete spectrum of healthcare services, from advanced clinical specialties and precise diagnostics to round-the-clock support facilities.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {servicesData.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Top Gradient Accent */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${category.color}`} />
              
              <div className="p-8 flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl ${category.bgColor} flex items-center justify-center text-2xl shadow-inner`}>
                    {category.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 leading-tight">
                    {category.title}
                  </h3>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-4">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 group">
                      <svg className="w-4 h-4 shrink-0 mt-0.5 text-slate-300 group-hover:text-teal-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[0.92rem] text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

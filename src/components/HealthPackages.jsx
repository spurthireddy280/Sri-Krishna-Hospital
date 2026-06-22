/**
 * HealthPackages — Clean, premium health check-up packages section
 * with expandable detail cards and organized test lists
 */
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const packages = [
  {
    name: 'Senior Citizen Package',
    tag: '60+ Years',
    price: 5000,
    color: 'from-amber-500 to-orange-500',
    colorLight: 'bg-amber-50 text-amber-700 border-amber-100',
    icon: '👴',
    description: 'Complete health screening designed for senior citizens covering cardiac, diabetic, liver, kidney, and thyroid health.',
    highlights: ['2D Echo with Colour Doppler', 'Cardiologist Consultation', 'General Physician Consultation', 'Thyroid Profile', 'Vitamin B12 & D'],
    tests: [
      'Fasting Plasma Glucose (FBS)', 'Complete Urine Examination (CUE)', 'Liver Function Test',
      'Glycosylated Hemoglobin (HbA1c)', 'Vitamin B12', 'Vitamin D (25 OH)',
      'Erythrocyte Sedimentation Rate (ESR)', 'Post Prandial Plasma Glucose (PLBS)',
      'Lipid Profile', 'Thyroid Stimulating Hormone (TSH)', 'Electrocardiogram (ECG)',
      'C-Reactive Proteins (CRP)', 'Serum Uric Acid', '2D Echo with Colour Doppler',
      'Blood Grouping & RH Typing', 'Blood Urea', 'Complete Blood Picture (CBP)',
      'Serum Creatinine', 'HBsAg — Rapid', 'Prostate Specific Antigen (Male)',
      'HIV & HCV', 'Serum Calcium', 'General Physician Consultation', 'Cardiologist Consultation',
    ],
  },
  {
    name: 'Master Cardiac Package',
    tag: 'Comprehensive',
    price: 5000,
    color: 'from-rose-500 to-pink-500',
    colorLight: 'bg-rose-50 text-rose-700 border-rose-100',
    icon: '❤️',
    description: 'Our most comprehensive cardiac evaluation with stress testing, echocardiography, and full-body metabolic screening.',
    highlights: ['Treadmill Test (TMT)', '2D Echo', 'Cardiologist Consultation', 'Lipid Profile', 'Thyroid & Liver Panel'],
    tests: [
      'Treadmill Test (TMT)', '2D Echo', 'Anti HCV (Hepatitis C Virus)',
      'Blood Group & RH Typing', 'Blood Urea', 'Complete Blood Picture (CBP)',
      'Complete Urine Examination (CUE)', 'Erythrocyte Sedimentation Rate (ESR)',
      'Fasting Plasma Glucose (FBS)', 'Post Prandial Plasma Glucose (PLBS)',
      'Glycosylated Hemoglobin (HbA1c)', 'HBsAg', 'HIV I & II', 'Lipid Profile',
      'Liver Function Test', 'Random Plasma Glucose (RBS)', 'Serum Calcium',
      'Serum Creatinine', 'Serum Electrolytes', 'Serum Uric Acid',
      'Thyroid Stimulating Hormone (TSH)', 'Electrocardiogram (ECG)',
      'General Physician Consultation', 'Cardiologist Consultation',
    ],
  },
  {
    name: 'Basic Cardiac Package',
    tag: 'Essential',
    price: 2500,
    color: 'from-navy-500 to-blue-500',
    colorLight: 'bg-blue-50 text-blue-700 border-blue-100',
    icon: '💙',
    description: 'Essential cardiac screening with echo, stress test, and key cardiac markers for early detection.',
    highlights: ['2D Echo with Colour Doppler', 'Treadmill Test (TMT)', 'Cardiologist Consultation', 'Lipid Profile', 'hs-CRP & CPK-MB'],
    tests: [
      '2D Echo with Colour Doppler', 'Complete Blood Picture (CBP)', 'Serum Creatinine',
      'Complete Urine Examination (CUE)', 'Electrocardiogram (ECG)',
      'Fasting Plasma Glucose (FBS)', 'Lipid Profile',
      'Post Prandial Plasma Glucose (PLBS)', 'Treadmill Test (TMT)',
      'High-Sensitivity C-Reactive Protein (hs-CRP)', 'Creatine Phosphokinase-MB (CPK-MB)',
      'Cardiologist Consultation',
    ],
  },
  {
    name: 'Routine Health Checkup',
    tag: 'Popular',
    price: 900,
    color: 'from-teal-500 to-emerald-500',
    colorLight: 'bg-teal-50 text-teal-700 border-teal-100',
    icon: '🩺',
    description: 'Affordable annual wellness screening covering blood work, liver function, viral markers, and physician consultation.',
    highlights: ['Complete Blood Picture', 'Liver Function Test', 'Viral Markers (HIV, HBsAg, HCV)', 'Physician Consultation'],
    tests: [
      'Complete Blood Picture (CBP)', 'Erythrocyte Sedimentation Rate (ESR)',
      'Serum Creatinine', 'Random Plasma Glucose (RBS)',
      'Complete Urine Examination (CUE)', 'Serum Cholesterol',
      'Viral Markers (HIV, HBsAg, HCV)', 'Liver Function Test',
      'General Physician Consultation',
    ],
  },
  {
    name: 'Diabetic Health Checkup',
    tag: 'Specialized',
    price: 1200,
    color: 'from-violet-500 to-purple-500',
    colorLight: 'bg-violet-50 text-violet-700 border-violet-100',
    icon: '🔬',
    description: 'Targeted screening for diabetic patients covering glucose levels, lipid profile, kidney function, and cardiac markers.',
    highlights: ['Electrocardiogram (ECG)', 'Lipid Profile', 'HbA1c', 'Fasting & PP Glucose'],
    tests: [
      'Electrocardiogram (ECG)', 'Complete Blood Picture (CBP)', 'Lipid Profile',
      'Erythrocyte Sedimentation Rate (ESR)', 'Blood Urea',
      'Fasting Plasma Glucose (FBS)', 'Post Prandial Plasma Glucose (PLBS)',
      'Glycosylated Hemoglobin (HbA1c)', 'Serum Creatinine',
      'Complete Urine Examination (CUE)',
    ],
  },
  {
    name: 'Renal Package',
    tag: 'Kidney Care',
    price: 1200,
    color: 'from-cyan-500 to-sky-500',
    colorLight: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    icon: '🫘',
    description: 'Focused kidney health evaluation including blood chemistry, electrolytes, and renal function markers.',
    highlights: ['Serum Electrolytes', 'Serum Creatinine', 'Blood Urea', 'Serum Calcium'],
    tests: [
      'Complete Blood Picture (CBP)', 'Random Plasma Glucose (RBS)', 'Blood Urea',
      'Serum Electrolytes', 'Serum Creatinine', 'Serum Calcium',
      'Complete Urine Examination (CUE)', 'Urine Microalbumin',
    ],
  },
]

export default function HealthPackages() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="packages" className="py-28 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Subtle decorative blobs */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[350px] h-[350px] bg-navy-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-teal-600 px-5 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-4">
            Health Packages
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-slate-900 tracking-tight mb-3">
            Comprehensive Health Check-Up Packages
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Preventive care at affordable prices. Choose a package tailored to your health needs — every package includes expert consultations.
          </p>
        </motion.div>

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-sm text-slate-400 mb-4">Need a custom package? Contact us for personalized health plans.</p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-navy-500 to-teal-500 text-white font-semibold text-sm rounded-full shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Contact for Custom Plans
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/** Individual Package Card with expandable test list */
function PackageCard({ pkg }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-black/[0.06] transition-all duration-400 overflow-hidden flex flex-col">
      {/* Gradient top accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${pkg.color}`} />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{pkg.icon}</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">{pkg.name}</h3>
              <span className={`inline-block mt-1 text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${pkg.colorLight}`}>
                {pkg.tag}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-2xl font-extrabold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
              ₹{pkg.price.toLocaleString()}
            </div>
            <div className="text-[0.65rem] text-slate-400 font-medium">per person</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed mb-5">{pkg.description}</p>

        {/* Key Highlights */}
        <div className="space-y-2 mb-5 flex-1">
          <div className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Inclusions</div>
          {pkg.highlights.map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
              <svg className={`w-4 h-4 shrink-0`} viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" className={`fill-current opacity-10`} style={{ color: 'var(--tw-gradient-from, #14b8a6)' }} />
                <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Total tests count + expand trigger */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-sm font-semibold text-navy-500 hover:text-teal-600 transition-colors group/btn"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
              {expanded ? 'Hide' : 'View'} All {pkg.tests.length} Tests
            </span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>

          {/* Expandable Test List */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-1 gap-1.5">
                  {pkg.tests.map((test, idx) => (
                    <div
                      key={test}
                      className="flex items-center gap-2 text-[0.82rem] text-slate-500 py-1 px-2 rounded-md hover:bg-slate-50 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      {test}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Book Now footer */}
      <div className="px-6 pb-5 pt-1">
        <a
          href="#"
          className={`block text-center py-3 rounded-xl bg-gradient-to-r ${pkg.color} text-white font-semibold text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 opacity-90 hover:opacity-100`}
        >
          Book This Package
        </a>
      </div>
    </div>
  )
}

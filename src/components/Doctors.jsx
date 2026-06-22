/**
 * Doctors — Interactive grid with 3D tilt hover effect
 */
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const doctors = [
  { name: 'Dr. Anil Kumar', title: 'Chief Neurosurgeon', specialty: 'Neurosurgery', img: '/doctor-1.png' },
  { name: 'Dr. Priya Sharma', title: 'Consultant Cardiologist', specialty: 'Cardiology', img: '/doctor-2.png' },
  { name: 'Dr. Rajesh Verma', title: 'Senior Orthopedic Surgeon', specialty: 'Orthopedics', img: '/doctor-3.png' },
  { name: 'Dr. Meera Iyer', title: 'Consultant Neurologist', specialty: 'Neurology', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80' },
]

export default function Doctors() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="doctors" className="py-28 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-teal-600 px-5 py-1.5 bg-teal-50 border border-teal-100 rounded-full mb-4">
            Featured Specialists
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-slate-900 tracking-tight mb-3">
            Meet Our Core Medical Team
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Experienced specialists combining clinical excellence with genuine compassion to deliver exceptional outcomes.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard doc={doc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Card with 3D tilt on mouse move */
function TiltCard({ doc }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('perspective(800px) rotateY(0deg) rotateX(0deg)')

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(800px) rotateY(${x * 14}deg) rotateX(${y * -10}deg) scale3d(1.03,1.03,1.03)`)
  }

  const handleLeave = () => {
    setTransform('perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-[0_16px_48px_rgba(0,0,0,0.1),0_0_40px_rgba(37,99,235,0.08)] transition-shadow duration-400"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div style={{ transform, transition: 'transform 0.12s ease-out' }}>
        {/* Photo */}
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={doc.img}
            alt={doc.name}
            className="w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-[1.07]"
            loading="lazy"
          />
          <span className="absolute top-3.5 left-3.5 px-4 py-1 bg-navy-950/60 backdrop-blur-md text-teal-300 text-[0.65rem] font-bold tracking-[0.1em] uppercase rounded-full border border-white/[0.06]">
            {doc.specialty}
          </span>
        </div>

        {/* Info */}
        <div className="p-5 text-center">
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">{doc.name}</h3>
          <p className="text-sm text-slate-400 mb-4">{doc.title}</p>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 group/link hover:text-teal-600 transition-colors">
            View Profile
            <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BookingModal from '../components/BookingModal.jsx'

// Mock Data
const specialities = [
  'Anaesthesiology', 'Bariatrics', 'Cardiac Sciences', 'Cardiology',
  'Cosmetology & Plastic Surgery', 'Critical Care', 'Dentistry',
  'Dermatology', 'Dietician and Nutrition', 'Nephrology', 'Neurosciences',
  'Oncology', 'Orthopedics'
]

const doctorsData = [
  {
    id: 1,
    name: 'Dr Aniket S Phutane',
    specialty: 'Neurosciences',
    experience: '7+ Years',
    degrees: 'MBBS, DNB GENE...',
    location: 'Sri Krishna Hospital, Jubilee Hills, Hyderabad',
    image: '/doctor-1.png'
  },
  {
    id: 2,
    name: 'Dr P Vijay Anand Reddy',
    specialty: 'Oncology',
    experience: '30+ Years',
    degrees: 'MBBS; MD (Radi...',
    location: 'Sri Krishna Hospital, Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'
  },
  {
    id: 3,
    name: 'Dr Pratap Chandra Rath',
    specialty: 'Cardiology',
    experience: '35+ Years',
    degrees: 'MBBS; MD; DM (...',
    location: 'Sri Krishna Hospital, Jubilee Hills, Hyderabad',
    image: '/doctor-2.png'
  },
  {
    id: 4,
    name: 'Dr Somasekhar M',
    specialty: 'Nephrology',
    experience: '27+ Years',
    degrees: 'MBBS; MD (Gene...',
    location: 'Sri Krishna Hospital, Jubilee Hills, Hyderabad',
    image: '/doctor-3.png'
  },
  {
    id: 5,
    name: 'Dr Meera Iyer',
    specialty: 'Neurology',
    experience: '15+ Years',
    degrees: 'MBBS, MD (Med)',
    location: 'Sri Krishna Hospital, Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80'
  },
  {
    id: 6,
    name: 'Dr Rajesh Verma',
    specialty: 'Orthopedics',
    experience: '22+ Years',
    degrees: 'MBBS, MS (Ortho)',
    location: 'Sri Krishna Hospital, Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1537368910025-7028dd906bba?w=400&q=80'
  }
]

export default function BookAppointment() {
  const [searchTerm, setSearchTerm] = useState('')
  const [specSearch, setSpecSearch] = useState('')
  const [selectedSpecs, setSelectedSpecs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [bookedDoctorIds, setBookedDoctorIds] = useState(() => {
    // Load booked doctors from localStorage so they persist across page refreshes
    try {
      const saved = localStorage.getItem('bookedDoctorIds')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Persist booked doctor IDs to localStorage
  useEffect(() => {
    localStorage.setItem('bookedDoctorIds', JSON.stringify(bookedDoctorIds))
  }, [bookedDoctorIds])

  const handleSpecToggle = (spec) => {
    setSelectedSpecs(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    )
  }

  const clearFilters = () => {
    setSelectedSpecs([])
    setSearchTerm('')
    setSpecSearch('')
  }

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleBooked = (doctorId) => {
    setBookedDoctorIds(prev => [...prev, doctorId])
  }

  // Filter logic — also exclude booked doctors
  const filteredDoctors = doctorsData.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpec = selectedSpecs.length === 0 || selectedSpecs.includes(doc.specialty)
    const notBooked = !bookedDoctorIds.includes(doc.id)
    return matchesSearch && matchesSpec && notBooked
  })

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Header Search & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl text-slate-800">
            Meet Our <span className="font-bold italic text-navy-900">Experts</span> <span className="text-slate-500 text-2xl font-light">({filteredDoctors.length})</span>
          </h1>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search for Doctors" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 rounded-full border border-slate-200 outline-none focus:border-teal-500 transition-colors shadow-sm text-sm"
            />
            <button className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[300px] shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-24 overflow-hidden">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-5 bg-slate-50/80 border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  Filter By
                </div>
                <button onClick={clearFilters} className="text-teal-600 text-sm font-bold hover:underline">
                  Clear All
                </button>
              </div>

              {/* Specialities Filter */}
              <div className="p-5">
                <div className="font-bold text-slate-700 text-sm mb-4">Specialities</div>
                <div className="relative mb-5">
                  <svg className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input 
                    type="text" 
                    placeholder="Search Speciality" 
                    value={specSearch}
                    onChange={(e) => setSpecSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="max-h-[280px] overflow-y-auto pr-2 flex flex-col gap-3.5 scrollbar-thin">
                  {specialities.filter(s => s.toLowerCase().includes(specSearch.toLowerCase())).map(spec => (
                    <label key={spec} className="flex items-center gap-3.5 cursor-pointer group py-0.5">
                      <div className="relative flex items-center shrink-0">
                        <input 
                          type="checkbox" 
                          checked={selectedSpecs.includes(spec)}
                          onChange={() => handleSpecToggle(spec)}
                          className="peer sr-only"
                        />
                        <div className="w-[1.15rem] h-[1.15rem] border-2 border-slate-300 rounded bg-white peer-checked:bg-teal-600 peer-checked:border-teal-600 transition-all flex items-center justify-center shadow-sm">
                          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      </div>
                      <span className="text-[0.95rem] text-slate-600 group-hover:text-slate-900 transition-colors">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* City Filter */}
              <div className="p-5 border-t border-slate-200">
                <div className="font-bold text-slate-700 text-sm mb-4">Select City</div>
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input 
                    type="text" 
                    placeholder="Search Cities" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Doctor Grid */}
          <div className="flex-1 grid md:grid-cols-2 gap-6 items-start">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doc, idx) => (
                <motion.div 
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  {/* Top Info Area */}
                  <div className="flex flex-1">
                    {/* Photo (Left Side) */}
                    <div className="w-[140px] shrink-0 bg-slate-50 relative">
                      <img src={doc.image} alt={doc.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                    </div>
                    
                    {/* Info (Right Side) */}
                    <div className="flex-1 p-5 flex flex-col">
                      <div className="flex justify-between items-start mb-1.5">
                        <h3 className="font-bold text-navy-900 text-[1.1rem] leading-tight pr-2">{doc.name}</h3>
                        <button className="text-slate-400 hover:text-teal-600 transition-colors shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        </button>
                      </div>
                      <div className="text-sm text-slate-500 mb-3">{doc.specialty}</div>
                      <div className="text-[0.85rem] text-slate-700 font-medium mb-4">{doc.experience} <span className="text-slate-300 mx-1">|</span> {doc.degrees}</div>
                      
                      <div className="flex gap-2.5 items-start mt-auto">
                        <div className="mt-1 shrink-0">
                          <div className="w-3.5 h-3.5 rounded-full border-[3px] border-teal-500 bg-white" />
                        </div>
                        <div className="text-[0.8rem] text-slate-500 leading-snug">{doc.location}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Bottom) */}
                  <div className="grid grid-cols-2 border-t border-slate-200">
                    <button 
                      onClick={() => openBookingModal(doc)}
                      className="py-4 bg-[#f5b841] hover:bg-[#e6ab35] text-navy-900 font-bold text-[0.85rem] transition-colors flex justify-center items-center gap-1.5 group border-r border-slate-200"
                    >
                      Book Appointment
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </button>
                    <button className="py-4 bg-white hover:bg-slate-50 text-teal-700 font-bold text-[0.85rem] transition-colors flex justify-center items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Call Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredDoctors.length === 0 && (
              <div className="col-span-2 py-24 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                <p className="text-lg">No doctors found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-teal-600 font-bold hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        doctor={selectedDoctor}
        onBooked={handleBooked}
      />
    </div>
  )
}

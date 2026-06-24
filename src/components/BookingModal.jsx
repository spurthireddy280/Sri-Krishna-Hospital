import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BookingModal({ isOpen, onClose, doctor }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [village, setVillage] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [gender, setGender] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Appointment Requested for ${name} with ${doctor?.name} on ${appointmentDate}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] bg-navy-950/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[2010] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
                <h3 className="font-bold text-navy-800 text-lg">Book Appointment</h3>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto">
                {/* Hospital/Doctor Info */}
                <div className="flex gap-4 mb-6 items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-200">
                    {doctor?.image ? (
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-base font-bold text-navy-900 mb-1">{doctor?.name || 'Select Doctor'}</div>
                    <div className="text-[0.7rem] text-slate-500 flex items-start gap-1.5 leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1 shrink-0" />
                      {doctor?.location || 'Sri Krishna Hospital, Jubilee Hills, Hyderabad'}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Patient Name */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                    <input
                      type="text"
                      placeholder="Patient Name *"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                    <input
                      type="tel"
                      placeholder="Contact Number *"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                    />
                  </div>

                  {/* Gender */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 text-sm text-slate-700 outline-none bg-white appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="" disabled>Select Gender *</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Appointment Date */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 text-sm text-slate-700 outline-none"
                      placeholder="Appointment Date *"
                    />
                  </div>

                  {/* Village */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                    <input
                      type="text"
                      placeholder="Name of the Village *"
                      required
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                    />
                  </div>

                  {/* District & State — two-column row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                      <input
                        type="text"
                        placeholder="District *"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                      />
                    </div>
                    <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                      <input
                        type="text"
                        placeholder="State *"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-3.5 bg-[#f6c25b] hover:bg-[#efb543] text-navy-900 font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    Request Appointment
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

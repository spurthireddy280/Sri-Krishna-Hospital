import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BookingModal({ isOpen, onClose, doctor, healthPackage, onBooked }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [village, setVillage] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [gender, setGender] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingStatus, setBookingStatus] = useState('idle') // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  // Reset form whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setName('')
      setPhone('')
      setVillage('')
      setDistrict('')
      setState('')
      setAppointmentDate('')
      setGender('')
      setBookingStatus('idle')
      setErrorMessage('')
      setIsSubmitting(false)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const formData = {
      name,
      gender,
      phone,
      date: appointmentDate,
      village,
      district,
      state,
      department: healthPackage ? healthPackage.name : doctor?.name || 'General Consultation'
    }

    try {
      const response = await fetch('https://hospital-backend-silk.vercel.app/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setBookingStatus('success')
        // Notify parent that this doctor/package was booked
        if (onBooked) {
          onBooked(doctor?.id || healthPackage?.name)
        }
      } else {
        setBookingStatus('error')
        setErrorMessage('Failed to book appointment. Please try again.')
      }
    } catch (error) {
      console.error('Error connecting to backend:', error)
      setBookingStatus('error')
      setErrorMessage('Could not connect to the server. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const bookingTarget = healthPackage ? healthPackage.name : doctor?.name

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
              <AnimatePresence mode="wait">
                {bookingStatus === 'success' ? (
                  /* ─── SUCCESS STATE ─── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="p-8 flex flex-col items-center text-center"
                  >
                    {/* Animated checkmark */}
                    <div className="relative mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30"
                      >
                        <motion.svg
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="w-10 h-10 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.polyline
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.35 }}
                            points="20 6 9 17 4 12"
                          />
                        </motion.svg>
                      </motion.div>
                      {/* Pulse ring */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2, repeat: 2, repeatType: 'loop' }}
                        className="absolute inset-0 w-20 h-20 rounded-full border-2 border-teal-400"
                      />
                    </div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl font-bold text-slate-900 mb-2"
                    >
                      Appointment Confirmed!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed"
                    >
                      Your appointment has been successfully requested. We'll reach out to confirm shortly.
                    </motion.p>

                    {/* Booking summary card */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="w-full bg-slate-50 rounded-xl border border-slate-100 p-5 mb-6 text-left"
                    >
                      <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">Booking Details</div>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          </div>
                          <div>
                            <div className="text-[0.68rem] text-slate-400">Patient</div>
                            <div className="text-sm font-semibold text-slate-800">{name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                          </div>
                          <div>
                            <div className="text-[0.68rem] text-slate-400">Contact</div>
                            <div className="text-sm font-semibold text-slate-800">{phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                            {healthPackage ? (
                              <span className="text-base">{healthPackage.icon}</span>
                            ) : (
                              <svg className="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></svg>
                            )}
                          </div>
                          <div>
                            <div className="text-[0.68rem] text-slate-400">{healthPackage ? 'Package' : 'Doctor'}</div>
                            <div className="text-sm font-semibold text-slate-800">{bookingTarget}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          </div>
                          <div>
                            <div className="text-[0.68rem] text-slate-400">Date</div>
                            <div className="text-sm font-semibold text-slate-800">
                              {appointmentDate ? new Date(appointmentDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 }}
                      onClick={onClose}
                      className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ─── FORM STATE ─── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col max-h-[90vh]"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-sm">
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        </div>
                        <h3 className="font-bold text-navy-800 text-lg">{healthPackage ? 'Book Health Package' : 'Book Appointment'}</h3>
                      </div>
                      <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all flex items-center justify-center"
                        aria-label="Close modal"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto">
                      {/* Doctor/Package Info */}
                      {healthPackage ? (
                        <div className="flex gap-4 mb-6 items-center p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-white border border-slate-100 shadow-sm shrink-0">
                            {healthPackage.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-base font-bold text-navy-900 mb-1">{healthPackage.name}</div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${healthPackage.colorLight}`}>
                                {healthPackage.tag}
                              </span>
                              <span className="text-sm font-bold text-teal-600">₹{healthPackage.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-4 mb-6 items-center p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 bg-slate-200">
                            {doctor?.image ? (
                              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
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
                      )}

                      {/* Error Banner */}
                      <AnimatePresence>
                        {bookingStatus === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-4 overflow-hidden"
                          >
                            <div className="flex items-center gap-3 p-3.5 bg-red-50 border border-red-100 rounded-xl">
                              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                              </div>
                              <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Patient Name */}
                        <div className="relative">
                          <label className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Patient Name</label>
                          <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                            <input
                              type="text"
                              placeholder="Enter full name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                            />
                          </div>
                        </div>

                        {/* Contact + Gender row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contact</label>
                            <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                              <input
                                type="tel"
                                placeholder="Phone number"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Gender</label>
                            <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                              <select
                                required
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-4 py-3 text-sm text-slate-700 outline-none bg-white appearance-none cursor-pointer"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                              >
                                <option value="" disabled>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Appointment Date */}
                        <div>
                          <label className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Preferred Date</label>
                          <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                            <input
                              type="date"
                              required
                              value={appointmentDate}
                              onChange={(e) => setAppointmentDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-3 text-sm text-slate-700 outline-none"
                            />
                          </div>
                        </div>

                        {/* Village */}
                        <div>
                          <label className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Village</label>
                          <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                            <input
                              type="text"
                              placeholder="Name of village"
                              required
                              value={village}
                              onChange={(e) => setVillage(e.target.value)}
                              className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                            />
                          </div>
                        </div>

                        {/* District & State */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1.5">District</label>
                            <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                              <input
                                type="text"
                                placeholder="District"
                                required
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1.5">State</label>
                            <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                              <input
                                type="text"
                                placeholder="State"
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#f6c25b] to-[#efb543] hover:from-[#efb543] hover:to-[#e6a830] disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 text-navy-900 font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Request Appointment
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mediaImages = [
  {
    src: '/media/media-1.jpg',
    alt: 'Sri Krishna Hospital - Services & Specialities',
    caption: 'Our Services & Specialities',
  },
  {
    src: '/media/media-2.jpg',
    alt: 'Sri Krishna Hospital - World Pharmacy Day',
    caption: 'World Pharmacy Day Celebration',
  },
  {
    src: '/media/media-3.jpg',
    alt: 'Sri Krishna Neuro & Super Speciality Hospital - Special Services',
    caption: 'Our Special Services',
  },
  {
    src: '/media/media-4.jpg',
    alt: 'Sri Krishna Hospital - Consultation Services',
    caption: 'Expert Consultation Services',
  },
  {
    src: '/media/media-5.jpg',
    alt: 'Sri Krishna Hospital - Aarogyasri Services',
    caption: 'Aarogyasri & Healthcare Services',
  },
]

export default function MediaRoom() {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedImage])

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 py-20 lg:py-28">
        {/* Ambient glows */}
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-navy-500/20 rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-teal-300 text-xs font-semibold tracking-wide"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
            Gallery & Media
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            Media <span className="text-gradient">Room</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Explore our gallery of hospital events, services, and community initiatives.
          </motion.p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-5 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer"
              onClick={() => setSelectedImage(idx)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                <div>
                  <div className="text-white font-bold text-lg mb-1">{image.caption}</div>
                  <div className="inline-flex items-center gap-1.5 text-teal-300 text-sm font-medium">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6" /><path d="M10 14L21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    View Full Size
                  </div>
                </div>
              </div>
              {/* Bottom caption bar */}
              <div className="p-4 border-t border-slate-100">
                <div className="font-semibold text-slate-800 text-sm">{image.caption}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            />
            <div className="fixed inset-0 z-[2010] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors p-2 z-10"
                  aria-label="Close lightbox"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Navigation arrows */}
                {selectedImage > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage - 1) }}
                    className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                )}
                {selectedImage < mediaImages.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage + 1) }}
                    className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                )}

                {/* Image */}
                <img
                  src={mediaImages[selectedImage].src}
                  alt={mediaImages[selectedImage].alt}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />

                {/* Caption */}
                <div className="mt-4 text-center">
                  <div className="text-white font-semibold text-lg">{mediaImages[selectedImage].caption}</div>
                  <div className="text-white/40 text-sm mt-1">{selectedImage + 1} / {mediaImages.length}</div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

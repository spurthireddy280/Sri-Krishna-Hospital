/**
 * TopBar — Emergency contacts strip with pulsing 24/7 badge
 */
export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-sm py-2.5 relative z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between flex-wrap gap-2">
        {/* Phone Numbers */}
        <div className="flex items-center gap-6 flex-wrap">
          <a href="tel:+914012345678" className="flex items-center gap-2 text-navy-300 hover:text-teal-300 transition-colors font-medium text-xs">
            <PhoneIcon />
            <span>+91 40-1234-5678</span>
          </a>
          <a href="tel:+919876543210" className="flex items-center gap-2 text-navy-300 hover:text-teal-300 transition-colors font-medium text-xs">
            <PhoneIcon />
            <span>+91 98765-43210</span>
          </a>
          <a href="mailto:info@srikrishnaneuro.com" className="hidden sm:flex items-center gap-2 text-navy-300 hover:text-teal-300 transition-colors font-medium text-xs">
            <MailIcon />
            <span>info@srikrishnaneuro.com</span>
          </a>
        </div>

        {/* 24/7 Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 animate-pulse-ring">
          <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
          <span className="text-red-300 font-bold text-[0.68rem] tracking-wider uppercase">
            We Operate 24/7/365
          </span>
        </div>
      </div>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

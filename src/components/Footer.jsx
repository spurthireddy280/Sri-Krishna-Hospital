/**
 * Footer — Comprehensive footer with branding, links, contact, socials
 */
export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-navy-950 to-[#010812] text-navy-300 pt-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/[0.06]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.jpg"
                alt="Sri Krishna Neuro Super Speciality Hospital Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-bold text-white text-sm">Sri Krishna Hospital</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The region's premier destination for advanced neurological and comprehensive multispecialty healthcare. Your health, our commitment.
            </p>
            <div className="flex gap-2.5">
              {[FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] grid place-items-center text-slate-400 hover:bg-teal-500 hover:border-teal-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-[0.12em] mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {['Home', 'About Us', 'Our Doctors', 'Health Packages', 'Insurance Partners', 'Careers'].map((item) => (
                <a key={item} href="#" className="text-sm text-slate-400 hover:text-teal-300 hover:pl-1.5 transition-all">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-[0.12em] mb-6">Our Services</h4>
            <nav className="flex flex-col gap-3">
              {['Neurosurgery', 'Neurology', 'Cardiology', 'Orthopedics', 'General Medicine', 'Emergency Care'].map((item) => (
                <a key={item} href="#" className="text-sm text-slate-400 hover:text-teal-300 hover:pl-1.5 transition-all">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-[0.12em] mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <svg className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Plot No. 42, Jubilee Hills, Road No. 10, Hyderabad, Telangana 500033</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <svg className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Emergency: +91 40-1234-5678<br />Inquiry: +91 98765-43210</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <svg className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>info@srikrishnaneuro.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <p className="text-xs text-slate-500">&copy; 2026 Sri Krishna Neuro & Multi Speciality Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-teal-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-teal-300 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* Social Icons */
function FacebookIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
}

function InstagramIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
}

function LinkedInIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
}

function TwitterIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
}

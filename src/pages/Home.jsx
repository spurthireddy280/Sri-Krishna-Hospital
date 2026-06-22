import Hero from '../components/Hero.jsx'
import HealthPackages from '../components/HealthPackages.jsx'
import About from '../components/About.jsx'
import Founder from '../components/Founder.jsx'
import Doctors from '../components/Doctors.jsx'
import Services from '../components/Services.jsx'
import Insurance from '../components/Insurance.jsx'
import Testimonials from '../components/Testimonials.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <HealthPackages />
      <About />
      <Founder />
      <Doctors />
      <Services />
      <Insurance />
      <Testimonials />
    </main>
  )
}

import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import CodingProfiles from '@/components/CodingProfiles'
import HowItWorks from '@/components/HowItWorks'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <CodingProfiles />
      <HowItWorks />
      <Contact />
    </main>
  )
}

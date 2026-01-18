import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Adarsh Misra | Senior Software Engineer',
  description: 'Senior Software Engineer with 5.5+ years of experience designing and delivering scalable backend services, APIs, and distributed systems.',
  keywords: 'Adarsh Misra, Software Engineer, Backend Developer, Full-Stack Developer, Salesforce, Amazon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <ScrollProgress />
        <Navbar />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  )
}

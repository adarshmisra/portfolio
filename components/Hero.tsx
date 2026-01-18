'use client'

import { FaLinkedin, FaEnvelope, FaPhone, FaArrowDown, FaCode, FaServer, FaDatabase, FaCloud } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    
    // Fetch LinkedIn profile image
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('/api/linkedin-image')
        const data = await response.json()
        if (data.imageUrl) {
          setProfileImage(data.imageUrl)
        } else {
          console.warn('Profile image not available. See PROFILE_PICTURE_SETUP.md for setup instructions.')
        }
      } catch (error) {
        console.error('Failed to fetch LinkedIn image:', error)
        console.info('To add your profile picture, create .env.local with LINKEDIN_PROFILE_IMAGE_URL')
      } finally {
        setImageLoading(false)
      }
    }

    fetchProfileImage()
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden scroll-mt-20">
      {/* Clean background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="absolute inset-0 subtle-pattern opacity-30"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-violet-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-100 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="section-container text-center relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Picture */}
          <div className="mb-8 flex justify-center animate-fade-in-up">
            {profileImage ? (
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl hover:scale-105 transition-all duration-300 hover-lift">
                <Image
                  src={profileImage}
                  alt="Adarsh Misra"
                  fill
                  className="object-cover"
                  priority
                  onLoadingComplete={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false)
                    setProfileImage(null)
                  }}
                />
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse"></div>
                )}
              </div>
            ) : (
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center hover-lift hover:scale-105 transition-all duration-300">
                <span className="text-5xl sm:text-6xl font-bold text-white">
                  {isVisible ? 'AM' : ''}
                </span>
              </div>
            )}
          </div>

          <div className="mb-6 animate-float">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-slate-200">
              <FaCode className="icon-accent text-lg" />
              <span className="text-sm font-semibold gradient-text">Welcome to my Portfolio</span>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-sans mb-6 text-slate-900 leading-tight">
            Adarsh Misra
          </h1>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 gradient-text font-sans">
            Senior Software Engineer
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <FaServer className="icon-accent" />
              <span className="text-sm font-medium text-slate-700">Backend Development</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-lg">
              <FaDatabase className="icon-violet" />
              <span className="text-sm font-medium text-slate-700">Database Design</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg">
              <FaCloud className="icon-success" />
              <span className="text-sm font-medium text-slate-700">Cloud Architecture</span>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            5.5+ Years of Experience | Designing scalable backend services, APIs, and distributed systems
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16">
            <a
              href="https://www.linkedin.com/in/adarshmisra/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 group"
            >
              <FaLinkedin size={20} className="group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:adarshmisraa@gmail.com"
              className="btn-secondary flex items-center gap-2 group"
            >
              <FaEnvelope size={20} className="group-hover:scale-110 transition-transform" />
              <span>Email</span>
            </a>
            <a
              href="tel:+917990371312"
              className="btn-secondary flex items-center gap-2 group"
            >
              <FaPhone size={20} className="group-hover:scale-110 transition-transform" />
              <span>Call</span>
            </a>
          </div>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('about')
              if (element) {
                const offsetTop = element.offsetTop - 80
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth',
                })
              }
            }}
            className="inline-flex flex-col items-center text-slate-600 hover:text-blue-500 transition-all duration-300 animate-bounce cursor-pointer"
          >
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <FaArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}

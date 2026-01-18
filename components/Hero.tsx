'use client'

import { FaLinkedin, FaEnvelope, FaPhone, FaArrowDown } from 'react-icons/fa'
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
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      </div>

      <div className="section-container text-center relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Picture */}
          <div className="mb-8 flex justify-center animate-fade-in-up">
            {profileImage ? (
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden ring-4 ring-white shadow-2xl hover:scale-105 transition-transform duration-300">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 animate-pulse"></div>
                )}
              </div>
            ) : (
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden ring-4 ring-white shadow-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl sm:text-7xl font-bold text-white">
                  {isVisible ? 'AM' : ''}
                </span>
              </div>
            )}
          </div>

          <div className="mb-6 animate-float">
            <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-blue-200/50">
              <span className="text-sm font-semibold gradient-text">Welcome to my Portfolio</span>
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight">
            Adarsh Misra
          </h1>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 gradient-text">
            Senior Software Engineer
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto font-medium">
            Backend & Full-Stack Development
          </p>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
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
            className="inline-flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors animate-bounce cursor-pointer"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <FaArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}

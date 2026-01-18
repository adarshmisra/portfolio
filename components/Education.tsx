'use client'

import { FaGraduationCap, FaSchool } from 'react-icons/fa'
import { SiGoogle } from 'react-icons/si'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface EducationItem {
  degree: string
  institution: string
  location: string
  period: string
  details: string
  gradient: string
  brandIcon?: React.ComponentType<{ className?: string }>
  brandColor?: string
  useCustomLogo?: boolean
  logoUrl?: string
}

const education: EducationItem[] = [
  {
    degree: 'MBA – Digital Business',
    institution: 'BITS Pilani',
    location: 'India',
    period: '2023 – 2024',
    details: 'CGPA: 8.21',
    gradient: 'from-blue-500 to-cyan-500',
    useCustomLogo: true,
    logoUrl: 'https://www.bits-pilani.ac.in/wp-content/uploads/bits-pillani-2-1.webp'
  },
  {
    degree: 'B.Tech – ICT',
    institution: 'Dhirubhai Ambani University',
    location: 'India',
    period: '2016 – 2020',
    details: 'CGPA: 8.17',
    gradient: 'from-indigo-500 to-purple-500',
    useCustomLogo: true,
    logoUrl: 'https://www.daiict.ac.in/themes/daiict/images/daiict-logo.jpg'
  },
  {
    degree: 'CBSE Class 12',
    institution: 'Prakash Higher Secondary School',
    location: '',
    period: '2015 – 2016',
    details: '95.6%',
    gradient: 'from-purple-500 to-pink-500',
    useCustomLogo: true,
    logoUrl: 'https://prakashcbseschool.edu.in/wp-content/uploads/2014/09/prakash_logo.png'
  },
]

export default function Education() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(Array.from(prev).concat(index)))
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="education" className="section-container relative">
      <h2 className="section-title">Education</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {education.map((edu, index) => (
          <div
            key={index}
            ref={(el) => {
              refs.current[index] = el
            }}
            className={`card text-center hover:scale-105 transition-all duration-500 ${
              visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="flex justify-center mb-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${edu.gradient} rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300 relative overflow-hidden`}>
                {edu.useCustomLogo && edu.logoUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                      src={edu.logoUrl} 
                      alt={`${edu.institution} logo`}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        console.error(`Failed to load logo for ${edu.institution}:`, edu.logoUrl)
                        // Fallback to default icon
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const fallback = target.parentElement?.querySelector('.fallback-icon')
                        if (fallback) {
                          (fallback as HTMLElement).style.display = 'block'
                        }
                      }}
                    />
                    <div className="fallback-icon hidden" style={{ color: edu.brandColor || '#8b5cf6' }}>
                      <FaGraduationCap className="text-3xl" />
                    </div>
                  </div>
                ) : edu.brandIcon ? (
                  <div style={{ color: edu.brandColor }}>
                    <edu.brandIcon className="text-3xl" />
                  </div>
                ) : (
                  <FaGraduationCap className="text-white text-3xl" />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{edu.degree}</h3>
            <p className={`text-lg font-bold bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent mb-2`}>
              {edu.institution}
            </p>
            {edu.location && <p className="text-gray-500 text-sm mb-2">{edu.location}</p>}
            <p className="text-gray-600 text-sm font-medium mb-3">{edu.period}</p>
            <div className={`inline-block px-4 py-2 bg-gradient-to-r ${edu.gradient} text-white rounded-full font-semibold shadow-md`}>
              {edu.details}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

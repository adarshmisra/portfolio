'use client'

import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const contactItems = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'adarshmisraa@gmail.com',
      href: 'mailto:adarshmisraa@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 7990371312',
      href: 'tel:+917990371312',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/adarshmisra',
      href: 'https://www.linkedin.com/in/adarshmisra/',
      gradient: 'from-indigo-500 to-purple-500',
      external: true,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Remote, India',
      href: null,
      gradient: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section ref={ref} id="contact" className="section-container relative">
      <h2 className="section-title">Get In Touch</h2>
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="card text-center mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {contactItems.map((item, index) => {
            const Icon = item.icon
            const content = (
              <div className={`flex flex-col items-center p-8 bg-gradient-to-br ${item.gradient} rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <Icon className="text-3xl" />
                </div>
                <span className="font-bold text-lg mb-2">{item.label}</span>
                <span className="text-sm text-white/90">{item.value}</span>
              </div>
            )

            return item.href ? (
              <a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

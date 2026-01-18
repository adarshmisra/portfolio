'use client'

import { useEffect, useRef, useState } from 'react'

export default function About() {
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

  return (
    <section ref={ref} id="about" className="section-container relative">
      <h2 className="section-title">Professional Summary</h2>
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="card group hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Senior Software Engineer with <strong className="text-blue-600">5.5+ years of experience</strong> designing and delivering{' '}
              <strong className="text-indigo-600">20+ scalable backend services, APIs, and distributed systems</strong>. Proven collaborator with
              product managers, architects, and data scientists to ship data-driven solutions that improve performance
              and reduce costs. <strong className="text-purple-600">MBA in Digital Business</strong>, combining strong technical execution with
              strategic and business insight.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

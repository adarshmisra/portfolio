'use client'

import { useEffect, useRef, useState } from 'react'
import { SiSalesforce, SiAmazonaws } from 'react-icons/si'

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
  color: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Software Engineer (SMTS)',
    company: 'Salesforce',
    location: 'Remote, India',
    period: 'March 2022 – Present',
    color: 'from-blue-500 to-cyan-500',
    achievements: [
      'Designed and implemented integration of the External Client Apps framework in Mobile Publisher, achieving 99% reduction in operational costs while maintaining system reliability that includes the UI, back-end validations, data modeling, sandbox deployments, versioning.',
      'Developed full-stack Mobile Publisher Portal with Lightning and Aura components, scaling to 1000+ apps and improving monthly active users by 40% respecting Apple App Store and Google Play Store policies.',
      'Created a Proof of Concept for integrating Google APIs with Salesforce services, enabling advanced sentiment analysis for business insights using chart JS library to achieve 5 star ratings.',
      'Executed migration from Connected Apps to External Client Apps in Mobile Publisher for 1000+ apps, enhancing compliance and reducing operational risks by providing dry run APIs and support for Government cloud customers.',
      'Pilot for Native Agent force experience in Mobile Apps',
    ],
  },
  {
    title: 'Software Development Engineer',
    company: 'Amazon',
    location: 'Bangalore, India',
    period: 'January 2020 – February 2022',
    color: 'from-orange-500 to-yellow-500',
    achievements: [
      'Surfaced the cost of risk evaluation for AWS systems (EC2, S3, SQS, SNS), reducing cloud spend by 14%.',
      'Orchestrated fleet segregation for multi-modal systems, optimizing transaction processing speed and reducing latency by 25% by automating environment provisioning workflow, reducing setup time from 14 days to 24 hours and increasing team efficiency.',
    ],
  },
  {
    title: 'SDE Internship',
    company: 'Amazon',
    location: 'Bangalore, India',
    period: 'May 2019 – July 2019',
    color: 'from-purple-500 to-pink-500',
    achievements: [
      'Built an automated integration test framework for the FORTRESS (Fraudulent order detection through risk evaluation at super-speed) fraud detection system, ensuring reliable coverage 80%+ for risk evaluation models.',
    ],
  },
]

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newSet = new Set(prev)
              newSet.add(index)
              return newSet
            })
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
    <section id="experience" className="section-container relative bg-gradient-to-b from-white via-blue-50/30 to-white">
      <h2 className="section-title">Experience</h2>
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400 hidden md:block"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => {
                  refs.current[index] = el
                }}
                className={`relative transition-all duration-1000 ${
                  visibleItems.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="card hover:scale-[1.02] transition-transform duration-300 ml-0 md:ml-16 relative group">
                  {/* Company icon */}
                  <div className={`absolute -left-12 top-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl hidden md:flex group-hover:scale-110 transition-transform duration-300 border-2 border-gray-100`}>
                    {exp.company === 'Salesforce' ? (
                      <SiSalesforce className="text-3xl" style={{ color: '#00A1E0' }} />
                    ) : (
                      <SiAmazonaws className="text-3xl" style={{ color: '#FF9900' }} />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-10 rounded-2xl`}></div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {exp.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-xl font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                        {exp.company}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 font-medium">{exp.location}</span>
                    </div>
                    <p className="text-gray-500 font-medium">{exp.period}</p>
                  </div>
                  
                  <ul className="space-y-4 mt-6">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start group/item">
                        <span className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} mt-2 mr-4 group-hover/item:scale-150 transition-transform`}></span>
                        <span className="text-base leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

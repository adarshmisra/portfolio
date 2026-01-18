'use client'

import { useEffect, useRef, useState } from 'react'
import { SiSalesforce, SiAmazonaws } from 'react-icons/si'
import { FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt, FaCode, FaCloud, FaUsers, FaRocket } from 'react-icons/fa'

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
  color: string
  logoUrl?: string
  projectLink?: string
  projectTitle?: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Software Engineer (SMTS)',
    company: 'Salesforce',
    location: 'Remote, India',
    period: 'March 2022 – Present',
    color: 'from-blue-500 to-cyan-500',
    logoUrl: 'https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-with-type-logo.svg',
    projectTitle: 'ECA Migration Project',
    projectLink: 'https://help.salesforce.com/s/articleView?id=xcloud.branded_apps_eca_migration.htm&type=5',
    achievements: [
      'Designed and implemented integration of External Client Apps framework in Mobile Publisher, achieving 99% reduction in operational costs while maintaining system reliability',
      'Developed full-stack Mobile Publisher Portal with Lightning and Aura components, scaling to 1000+ apps and improving monthly active users by 40%',
      'Created a Proof of Concept for integrating Google APIs with Salesforce services, enabling advanced sentiment analysis for business insights',
      'Executed migration from Connected Apps to External Client Apps in Mobile Publisher for 1000+ apps, enhancing compliance and reducing operational risks',
      'Pilot for Native Agent force experience in Mobile Apps',
    ],
  },
  {
    title: 'Software Development Engineer',
    company: 'Amazon',
    location: 'Bangalore, India',
    period: 'January 2020 – February 2022',
    color: 'from-orange-500 to-yellow-500',
    logoUrl: 'https://assets.aboutamazon.com/48/8c/1bc5933b414d82435b08581f742d/logo-1.svg',
    achievements: [
      'Surfaced cost of risk evaluation for AWS systems (EC2, S3, SQS, SNS), reducing cloud spend by 14%',
      'Orchestrated fleet segregation for multi-modal systems, optimizing transaction processing speed and reducing latency by 25%',
      'Automated environment provisioning workflow, reducing setup time from 14 days to 24 hours and increasing team efficiency',
    ],
  },
  {
    title: 'SDE Internship',
    company: 'Amazon',
    location: 'Bangalore, India',
    period: 'May 2019 – July 2019',
    color: 'from-purple-500 to-pink-500',
    logoUrl: 'https://assets.aboutamazon.com/48/8c/1bc5933b414d82435b08581f742d/logo-1.svg',
    achievements: [
      'Built an automated integration test framework for FORTRESS fraud detection system, ensuring reliable coverage 80%+ for risk evaluation models',
    ],
  },
]

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
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
      observers.forEach((observer) => {
        if (observer) observer.disconnect()
      })
    }
  }, [])

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <section id="experience" className="section-container relative bg-gradient-to-b from-white via-blue-50/30 to-white">
      <h2 className="section-title">Professional Experience</h2>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`transition-all duration-1000 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Modern Card Design */}
              <div className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                expandedCard === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}>
                {/* Header with Logo */}
                <div className={`bg-gradient-to-r ${exp.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
                        {exp.logoUrl ? (
                          <img 
                            src={exp.logoUrl} 
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              console.error(`Failed to load ${exp.company} logo:`, exp.logoUrl)
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const fallback = target.parentElement?.querySelector('.fallback-icon')
                              if (fallback) {
                                (fallback as HTMLElement).style.display = 'block'
                              }
                            }}
                          />
                        ) : (
                          <div className="fallback-icon">
                            {exp.company === 'Salesforce' ? (
                              <SiSalesforce className="text-3xl" style={{ color: '#00A1E0' }} />
                            ) : (
                              <SiAmazonaws className="text-3xl" style={{ color: '#FF9900' }} />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-white">
                        <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-white/90">
                          <span className="font-semibold text-lg">{exp.company}</span>
                          {exp.projectLink && (
                            <a
                              href={exp.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors"
                            >
                              <FaExternalLinkAlt className="text-xs" />
                              {exp.projectTitle}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Period Badge */}
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                      <FaCalendarAlt className="text-sm" />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <FaMapMarkerAlt className="text-sm" />
                    <span className="text-sm font-medium">{exp.location}</span>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <FaCode className="text-blue-500" />
                      <h4 className="font-semibold text-gray-900">Key Achievements</h4>
                    </div>
                    
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors ${
                            achievement.includes('ECA Migration') || achievement.includes('External Client Apps') 
                              ? 'ring-2 ring-blue-200 border-blue-300' 
                              : ''
                          }`}
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-gray-700 text-sm leading-relaxed">{achievement}</p>
                            {achievement.includes('ECA Migration') && exp.projectLink && (
                              <div className="mt-2">
                                <a
                                  href={exp.projectLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                                >
                                  <FaExternalLinkAlt className="text-xs" />
                                  View ECA Migration Documentation
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  {exp.achievements.length > 3 && (
                    <button
                      onClick={() => toggleCard(index)}
                      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                    >
                      {expandedCard === index ? (
                        <>
                          <span>Show Less</span>
                          <FaCode className="rotate-180" />
                        </>
                      ) : (
                        <>
                          <span>Show More</span>
                          <FaCode />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

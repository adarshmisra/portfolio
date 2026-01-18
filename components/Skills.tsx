'use client'

import { useEffect, useRef, useState } from 'react'
import { FaServer, FaCode, FaCloud, FaFlask, FaRocket, FaJava } from 'react-icons/fa'
import { SiJavascript, SiHtml5, SiCss3, SiJenkins, SiAmazonaws } from 'react-icons/si'
import { MdCloudQueue, MdSpeed, MdSecurity } from 'react-icons/md'

interface Skill {
  name: string
  icon?: React.ComponentType<{ className?: string }>
}

interface SkillCategory {
  category: string
  skills: (string | Skill)[]
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Backend',
    skills: [
      { name: 'Java', icon: FaJava },
      'REST APIs',
      'Monoliths',
      'Microservices',
      'SOA'
    ],
    icon: FaServer,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    category: 'Frontend',
    skills: [
      'Salesforce LWC',
      'Aura',
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss3 },
      { name: 'JavaScript', icon: SiJavascript }
    ],
    icon: FaCode,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    category: 'Cloud',
    skills: [
      { name: 'AWS (EC2, S3, Lambda, SQS, SNS, VPC, DNS)', icon: SiAmazonaws }
    ],
    icon: FaCloud,
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    category: 'Testing & CI/CD',
    skills: [
      'TDD',
      'Automated Testing',
      { name: 'Jenkins', icon: SiJenkins }
    ],
    icon: FaFlask,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    category: 'Practices',
    skills: [
      'Agile',
      'Scrum',
      'Git',
      'Code Reviews',
      'Claude',
      'Cursor',
      'Copilot and other Gen AI tools'
    ],
    icon: FaRocket,
    gradient: 'from-indigo-500 to-blue-500',
  },
]

export default function Skills() {
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
    <section id="skills" className="section-container relative bg-gradient-to-b from-white via-indigo-50/30 to-white">
      <h2 className="section-title">Technical Skills</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            ref={(el) => {
              refs.current[index] = el
            }}
            className={`card hover:scale-105 transition-all duration-500 ${
              visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <category.icon className="text-white text-2xl" />
              </div>
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                {category.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, skillIndex) => {
                const skillName = typeof skill === 'string' ? skill : skill.name
                const SkillIcon = typeof skill === 'object' && skill.icon ? skill.icon : null
                
                return (
                  <span
                    key={skillIndex}
                    className={`px-4 py-2 bg-gradient-to-r ${category.gradient} text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2`}
                  >
                    {SkillIcon && <SkillIcon className="text-sm" />}
                    {skillName}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { FaCode, FaServer, FaDatabase, FaCloud, FaMobile, FaRocket } from 'react-icons/fa'
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiVercel } from 'react-icons/si'
import { MdApi, MdImage } from 'react-icons/md'

interface TechStack {
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  color: string
}

const techStack: TechStack[] = [
  {
    name: 'Next.js 14',
    icon: SiNextdotjs,
    description: 'React framework with App Router for server-side rendering and API routes',
    color: 'from-gray-900 to-gray-700',
  },
  {
    name: 'React',
    icon: SiReact,
    description: 'Component-based UI library for building interactive interfaces',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    description: 'Type-safe JavaScript for better code quality and developer experience',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    description: 'Utility-first CSS framework for rapid UI development',
    color: 'from-cyan-500 to-teal-500',
  },
]

const architectureFlow = [
  { step: 1, title: 'User Request', icon: FaMobile, description: 'Browser requests the page' },
  { step: 2, title: 'Next.js Server', icon: FaServer, description: 'Server renders React components' },
  { step: 3, title: 'API Routes', icon: MdApi, description: 'Fetches data (LinkedIn image, etc.)' },
  { step: 4, title: 'Components', icon: FaCode, description: 'Renders UI with Tailwind CSS' },
  { step: 5, title: 'Client Hydration', icon: FaRocket, description: 'Interactive features activate' },
]

export default function HowItWorks() {
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
    <section ref={ref} id="how-it-works" className="section-container relative bg-gradient-to-b from-white via-indigo-50/30 to-white">
      <h2 className="section-title">How This Website Works</h2>
      
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Tech Stack */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Tech Stack</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => {
              const Icon = tech.icon
              return (
                <div
                  key={index}
                  className="card text-center hover:scale-105 transition-transform duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="text-white text-3xl" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{tech.name}</h4>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Architecture Flow</h3>
          <div className="card p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
              {architectureFlow.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex flex-col items-center flex-1 relative">
                    {/* Arrow (hidden on mobile, shown on desktop) */}
                    {index < architectureFlow.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 z-0">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-indigo-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    )}
                    
                    {/* Step Circle */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-white text-2xl" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {item.step}
                      </div>
                    </div>
                    
                    {/* Step Info */}
                    <div className="text-center">
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaServer className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Server-Side Rendering</h4>
                  <p className="text-gray-600">
                    Next.js renders pages on the server for better SEO and initial load performance. 
                    Components are pre-rendered as HTML before being sent to the browser.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdApi className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">API Routes</h4>
                  <p className="text-gray-600">
                    Custom API endpoints handle server-side logic like fetching LinkedIn profile pictures. 
                    Routes are located in <code className="bg-gray-100 px-1 rounded">app/api/</code> directory.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCode className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Component Architecture</h4>
                  <p className="text-gray-600">
                    Modular React components in <code className="bg-gray-100 px-1 rounded">components/</code> directory. 
                    Each section (Hero, Experience, Skills) is a reusable, self-contained component.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <SiVercel className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Deployment Ready</h4>
                  <p className="text-gray-600">
                    Optimized for Vercel deployment with automatic builds, edge functions, and global CDN. 
                    Environment variables handle configuration without code changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Structure */}
        <div className="mt-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Project Structure</h3>
          <div className="card p-6 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
            <div className="space-y-2">
              <div><span className="text-blue-400">portfolio/</span></div>
              <div className="ml-4">
                <div><span className="text-purple-400">app/</span></div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">layout.tsx</span> <span className="text-gray-500"># Root layout & metadata</span></div>
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">page.tsx</span> <span className="text-gray-500"># Home page</span></div>
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">globals.css</span> <span className="text-gray-500"># Global styles</span></div>
                  <div><span className="text-green-400">└──</span> <span className="text-purple-400">api/</span></div>
                  <div className="ml-4">
                    <div><span className="text-green-400">└──</span> <span className="text-purple-400">linkedin-image/</span></div>
                    <div className="ml-4"><span className="text-yellow-300">route.ts</span> <span className="text-gray-500"># API endpoint</span></div>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <div><span className="text-purple-400">components/</span></div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">Hero.tsx</span></div>
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">Experience.tsx</span></div>
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">Skills.tsx</span></div>
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">Education.tsx</span></div>
                  <div><span className="text-green-400">├──</span> <span className="text-yellow-300">Contact.tsx</span></div>
                  <div><span className="text-green-400">└──</span> <span className="text-yellow-300">Navbar.tsx</span></div>
                </div>
              </div>
              <div className="ml-4">
                <div><span className="text-green-400">├──</span> <span className="text-yellow-300">package.json</span></div>
                <div><span className="text-green-400">├──</span> <span className="text-yellow-300">tailwind.config.ts</span></div>
                <div><span className="text-green-400">└──</span> <span className="text-yellow-300">.env.local</span> <span className="text-gray-500"># Environment variables</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { FaCode, FaTrophy, FaChartLine, FaExternalLinkAlt, FaStar, FaFire, FaMedal, FaBrain, FaLaptopCode, FaRocket } from 'react-icons/fa'
import { SiHackerrank, SiLeetcode, SiHackerearth, SiCodechef, SiCodeforces } from 'react-icons/si'

interface ProfileStats {
  platform: string
  username: string
  totalSolved?: number
  ranking?: number
  score?: number
  stars?: number
  contests?: number
  profileUrl: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  badge?: string
}

const codingProfiles: ProfileStats[] = [
  {
    platform: 'LeetCode',
    username: 'adarshmisra',
    totalSolved: 350,
    score: 2200,
    ranking: 15000,
    contests: 5,
    profileUrl: 'https://leetcode.com/adarshmisra',
    icon: SiLeetcode,
    color: 'from-yellow-500 to-orange-500',
    badge: 'Algorithm Expert'
  },
  {
    platform: 'InterviewBit',
    username: 'adarshmisra',
    totalSolved: 280,
    score: 450,
    ranking: 25000,
    profileUrl: 'https://www.interviewbit.com/profile/adarshmisra',
    icon: SiLeetcode, // Using LeetCode icon as placeholder
    color: 'from-purple-500 to-pink-500',
    badge: 'Problem Solver'
  },
  {
    platform: 'HackerRank',
    username: 'adarshmisra',
    totalSolved: 150,
    score: 1850,
    stars: 4,
    contests: 12,
    profileUrl: 'https://www.hackerrank.com/adarshmisra',
    icon: SiHackerrank,
    color: 'from-green-500 to-emerald-500',
    badge: '4 Star Coder'
  },
  {
    platform: 'HackerEarth',
    username: 'adarshmisra',
    totalSolved: 95,
    score: 1200,
    contests: 8,
    profileUrl: 'https://www.hackerearth.com/@adarshmisra',
    icon: SiHackerearth,
    color: 'from-orange-500 to-yellow-500',
    badge: 'Contest Participant'
  },
  {
    platform: 'CodeChef',
    username: 'adarshmisra',
    totalSolved: 200,
    score: 1800,
    ranking: 15000,
    stars: 3,
    contests: 15,
    profileUrl: 'https://www.codechef.com/users/adarshmisra',
    icon: SiCodechef,
    color: 'from-red-500 to-orange-500',
    badge: '3 Star Coder'
  },
  {
    platform: 'CodeForces',
    username: 'adarshmisra',
    totalSolved: 180,
    score: 1600,
    ranking: 12000,
    contests: 20,
    profileUrl: 'https://codeforces.com/profile/adarshmisra',
    icon: SiCodeforces,
    color: 'from-indigo-500 to-blue-500',
    badge: 'Expert Coder'
  }
]

// Calculate aggregate statistics
const aggregateStats = {
  totalProblemsSolved: codingProfiles.reduce((sum, profile) => sum + (profile.totalSolved || 0), 0),
  totalScore: codingProfiles.reduce((sum, profile) => sum + (profile.score || 0), 0),
  totalStars: codingProfiles.reduce((sum, profile) => sum + (profile.stars || 0), 0),
  totalContests: codingProfiles.reduce((sum, profile) => sum + (profile.contests || 0), 0),
  averageRanking: Math.round(codingProfiles.reduce((sum, profile) => sum + (profile.ranking || 0), 0) / codingProfiles.filter(p => p.ranking).length),
  bestRanking: Math.min(...codingProfiles.filter(p => p.ranking).map(p => p.ranking || Infinity)),
  platformsCount: codingProfiles.length
}

const skillCategories = [
  {
    title: 'Problem Solving',
    icon: FaBrain,
    color: 'from-purple-500 to-pink-500',
    skills: ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming'],
    level: 85
  },
  {
    title: 'Algorithms',
    icon: FaChartLine,
    color: 'from-blue-500 to-cyan-500',
    skills: ['Sorting', 'Searching', 'Greedy', 'Backtracking', 'Divide & Conquer', 'Two Pointers'],
    level: 78
  },
  {
    title: 'Data Structures',
    icon: FaLaptopCode,
    color: 'from-green-500 to-emerald-500',
    skills: ['Hash Tables', 'Stacks', 'Queues', 'Heaps', 'Trie', 'Segment Trees'],
    level: 82
  },
  {
    title: 'Contest Performance',
    icon: FaRocket,
    color: 'from-orange-500 to-yellow-500',
    skills: ['Time Management', 'Problem Selection', 'Optimization', 'Edge Cases', 'Complexity Analysis'],
    level: 75
  }
]

export default function CodingProfiles() {
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          fetchProfileData()
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

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API calls for different platforms
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Profile data loaded:', codingProfiles)
      
    } catch (err) {
      setError('Failed to fetch coding profile data')
      console.error('Error fetching profile data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section ref={ref} id="coding-profiles" className="section-container relative bg-gradient-to-b from-white via-green-50/30 to-white">
        <h2 className="section-title">Coding Performance & Analytics</h2>
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading coding performance analytics...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section ref={ref} id="coding-profiles" className="section-container relative bg-gradient-to-b from-white via-green-50/30 to-white">
        <h2 className="section-title">Coding Performance & Analytics</h2>
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <FaCode className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="coding-profiles" className="section-container relative bg-gradient-to-b from-white via-green-50/30 to-white">
      <h2 className="section-title">Coding Performance & Analytics</h2>
      
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Aggregate Performance Dashboard */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Performance Overview</h3>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{aggregateStats.totalProblemsSolved}</div>
              <div className="text-sm text-gray-600">Problems Solved</div>
            </div>
            
            <div className="card text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{aggregateStats.platformsCount}</div>
              <div className="text-sm text-gray-600">Platforms</div>
            </div>
            
            <div className="card text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">{aggregateStats.totalStars}</div>
              <div className="text-sm text-gray-600">Total Stars</div>
            </div>
            
            <div className="card text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaFire className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">{aggregateStats.totalContests}</div>
              <div className="text-sm text-gray-600">Total Contests</div>
            </div>
          </div>

          {/* Performance Bars */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h4>
              <div className="space-y-3">
                {codingProfiles.map((profile, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{profile.platform}</span>
                      <span className="text-sm text-gray-600">{profile.score || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 bg-gradient-to-r ${profile.color}`}
                        style={{ width: `${((profile.score || 0) / 2000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Problems Solved</h4>
              <div className="space-y-3">
                {codingProfiles.map((profile, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{profile.platform}</span>
                      <span className="text-sm text-gray-600">{profile.totalSolved || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 bg-gradient-to-r ${profile.color}`}
                        style={{ width: `${((profile.totalSolved || 0) / 300) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Details */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Platform Details</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {codingProfiles.map((profile, index) => {
              const Icon = profile.icon
              return (
                <div
                  key={index}
                  className="card hover:scale-105 transition-transform duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${profile.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{profile.platform}</h4>
                        <p className="text-sm text-gray-600">@{profile.username}</p>
                      </div>
                    </div>
                    <a
                      href={profile.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Problems Solved</span>
                      <span className="font-bold text-gray-900">{profile.totalSolved || 0}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Score</span>
                      <span className="font-bold text-gray-900">{(profile.score || 0).toLocaleString()}</span>
                    </div>
                    
                    {profile.ranking && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ranking</span>
                        <span className="font-bold text-gray-900">#{profile.ranking?.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {profile.stars && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Stars</span>
                        <div className="flex items-center gap-1">
                          {[...Array(profile.stars)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500 text-sm" />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {profile.contests && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Contests</span>
                        <span className="font-bold text-gray-900">{profile.contests}</span>
                      </div>
                    )}
                  </div>

                  {profile.badge && (
                    <div className="mt-4 text-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${profile.color} text-white rounded-full text-sm font-semibold`}>
                        <FaMedal className="text-sm" />
                        {profile.badge}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

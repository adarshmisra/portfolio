'use client'

import { useEffect, useRef, useState } from 'react'
import { FaCode, FaTrophy, FaFire, FaChartLine, FaBrain, FaLaptopCode } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

interface LeetCodeStats {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking?: number
  acceptanceRate?: number
  contributionPoints?: number
}

interface ProblemCategory {
  category: string
  problems: string[]
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const problemCategories: ProblemCategory[] = [
  {
    category: 'Data Structures',
    problems: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Heaps', 'Stacks', 'Queues', 'Hash Tables'],
    icon: FaBrain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    category: 'Algorithms',
    problems: ['Sorting', 'Searching', 'Dynamic Programming', 'Greedy', 'Backtracking', 'Divide & Conquer'],
    icon: FaChartLine,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    category: 'Advanced Topics',
    problems: ['Trie', 'Segment Tree', 'Binary Indexed Tree', 'Disjoint Set', 'Topological Sort'],
    icon: FaLaptopCode,
    color: 'from-green-500 to-emerald-500'
  }
]

export default function LeetCodeStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          fetchLeetCodeStats()
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

  const fetchLeetCodeStats = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // LeetCode username - you can change this to your actual username
      const username = 'adarshmisra'
      
      // Note: LeetCode doesn't have a public API for stats, so we'll use mock data
      // In a real implementation, you might need to use web scraping or a third-party API
      const mockStats: LeetCodeStats = {
        username: username,
        totalSolved: 350,
        easySolved: 120,
        mediumSolved: 180,
        hardSolved: 50,
        ranking: 15000,
        acceptanceRate: 65.5,
        contributionPoints: 2500
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats(mockStats)
    } catch (err) {
      setError('Failed to fetch LeetCode stats')
      console.error('Error fetching LeetCode stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section ref={ref} id="leetcode" className="section-container relative bg-gradient-to-b from-white via-purple-50/30 to-white">
        <h2 className="section-title">Data Structures & Algorithmic Proficiency</h2>
        <div className="max-w-6xl mx-auto">
          <div className="card p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading LeetCode statistics...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !stats) {
    return (
      <section ref={ref} id="leetcode" className="section-container relative bg-gradient-to-b from-white via-purple-50/30 to-white">
        <h2 className="section-title">Data Structures & Algorithmic Proficiency</h2>
        <div className="max-w-6xl mx-auto">
          <div className="card p-8 text-center">
            <FaCode className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">{error || 'Unable to load LeetCode statistics'}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="leetcode" className="section-container relative bg-gradient-to-b from-white via-purple-50/30 to-white">
      <h2 className="section-title">Data Structures & Algorithmic Proficiency</h2>
      
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* LeetCode Profile Header */}
        <div className="card p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <SiLeetcode className="text-5xl text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">@{stats.username}</h3>
              <p className="text-gray-600">LeetCode Profile</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalSolved}</div>
              <div className="text-sm text-gray-600">Total Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.easySolved}</div>
              <div className="text-sm text-gray-600">Easy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.mediumSolved}</div>
              <div className="text-sm text-gray-600">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.hardSolved}</div>
              <div className="text-sm text-gray-600">Hard</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {stats.ranking && (
              <div className="px-4 py-2 bg-purple-100 rounded-full">
                <span className="text-purple-700 font-semibold">Rank: #{stats.ranking.toLocaleString()}</span>
              </div>
            )}
            {stats.acceptanceRate && (
              <div className="px-4 py-2 bg-green-100 rounded-full">
                <span className="text-green-700 font-semibold">Acceptance: {stats.acceptanceRate}%</span>
              </div>
            )}
            {stats.contributionPoints && (
              <div className="px-4 py-2 bg-orange-100 rounded-full">
                <span className="text-orange-700 font-semibold">Contribution: {stats.contributionPoints}</span>
              </div>
            )}
          </div>
        </div>

        {/* Problem Categories */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Problem Categories</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {problemCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className="card hover:scale-105 transition-transform duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white text-xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{category.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.problems.map((problem, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r ${category.color} text-white rounded-full text-xs font-semibold`}
                      >
                        {problem}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Bars */}
        <div className="card p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Problem Solving Progress</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Easy Problems</span>
                <span className="text-sm text-gray-600">{stats.easySolved} solved</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(stats.easySolved / 500) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Medium Problems</span>
                <span className="text-sm text-gray-600">{stats.mediumSolved} solved</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(stats.mediumSolved / 1000) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Hard Problems</span>
                <span className="text-sm text-gray-600">{stats.hardSolved} solved</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(stats.hardSolved / 500) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center p-4">
              <FaTrophy className="text-3xl text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-900">Problem Solver</div>
              <div className="text-xs text-gray-600">300+ Problems</div>
            </div>
            <div className="card text-center p-4">
              <FaFire className="text-3xl text-orange-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-900">Consistent</div>
              <div className="text-xs text-gray-600">Daily Streak</div>
            </div>
            <div className="card text-center p-4">
              <FaBrain className="text-3xl text-purple-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-900">Algorithm Expert</div>
              <div className="text-xs text-gray-600">Advanced Topics</div>
            </div>
            <div className="card text-center p-4">
              <FaChartLine className="text-3xl text-green-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-900">Top Performer</div>
              <div className="text-xs text-gray-600">High Ranking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

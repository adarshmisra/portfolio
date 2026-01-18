import { FaLinkedin, FaEnvelope, FaHeart, FaRobot, FaBrain } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-gray-300 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2 text-lg">
            <span>Made with</span>
            <FaBrain className="text-purple-400 animate-pulse" />
            <span>Gen AI</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>by Adarsh Misra</span>
            <div className="ml-4 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full">
              <span className="text-xs font-semibold text-purple-300">AI-Powered</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.linkedin.com/in/adarshmisra/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="mailto:adarshmisraa@gmail.com"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>
          </div>
          <div className="text-sm text-gray-400">
            © {currentYear} Adarsh Misra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

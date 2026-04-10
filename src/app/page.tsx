import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import the 3D component to avoid SSR issues
const Gym3DCanvas = dynamic(() => import('@/components/Gym3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading 3D Gym Experience...</div>
    </div>
  )
})

export default function Home() {
  return (
    <div className="relative">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Gym3DCanvas />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              🏋️‍♀️
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Sujata Gym
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Transform your body, transform your life. Experience the future of fitness
              with our immersive 3D gym environment and personalized training programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/services"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Start Your Journey
              </Link>

              <Link
                href="/gallery"
                className="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                🎯 Explore 3D Gallery
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-gray-300">Happy Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-gray-300">Equipment Types</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-gray-300">Access</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">3D</div>
                <div className="text-sm text-gray-300">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

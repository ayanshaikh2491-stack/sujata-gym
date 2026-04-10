'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// Animated counter hook for stats
function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return count
}

function StatCard({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const count = useAnimatedCounter(target)
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center transition-all duration-300 hover:bg-white/15 hover:scale-105">
      <div className="text-3xl md:text-4xl font-bold text-yellow-400">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-300 mt-1">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = typeof window !== 'undefined' ? { current: null } : { current: null }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById(`feature-${title.replace(/\s/g, '-')}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [title])

  return (
    <div 
      id={`feature-${title.replace(/\s/g, '-')}`}
      className={`bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-500 hover:bg-white/15 hover:scale-105 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 hover:text-yellow-400">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              🏋️‍♀️
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Sujata Gym
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your body, transform your life. Experience world-class fitness
              with professional trainers, state-of-the-art equipment, and personalized training programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/services"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                🚀 Start Your Journey
              </Link>

              <Link
                href="/gallery"
                className="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full text-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                📸 View Gallery
              </Link>
            </div>

            {/* Stats with animated counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
              <StatCard target={500} label="Happy Members" suffix="+" />
              <StatCard target={50} label="Equipment Types" suffix="+" />
              <StatCard target={24} label="Access" suffix="/7" />
              <StatCard target={5} label="Years Experience" suffix="+" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="features-heading" className="text-4xl font-bold text-white text-center mb-4">
            Why Choose <span className="text-yellow-400">Sujata Gym</span>?
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Join thousands of satisfied members who have transformed their lives with us
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon="🏆" 
              title="Expert Trainers" 
              description="Certified professional trainers with years of experience to guide you through your fitness journey with personalized attention."
            />
            <FeatureCard 
              icon="💪" 
              title="Modern Equipment" 
              description="State-of-the-art fitness equipment and facilities to ensure the best workout experience with latest technology."
            />
            <FeatureCard 
              icon="🤝" 
              title="Community" 
              description="Join a supportive community of fitness enthusiasts who motivate each other to achieve their goals together."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
              Start your fitness journey today and get access to world-class facilities and expert guidance.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-black text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

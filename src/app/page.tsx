'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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

function StatCard({ target, label, suffix = '', delay }: { target: number; label: string; suffix?: string; delay: number }) {
  const count = useAnimatedCounter(target)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true)
        },
        { threshold: 0.3 }
      )
      if (ref.current) observer.observe(ref.current)
      return () => {
        observer.disconnect()
        clearTimeout(timer)
      }
    }, delay)
  }, [delay])

  return (
    <div 
      ref={ref}
      className={`relative group bg-[#12121a] rounded-2xl p-6 border border-[#f7ff00]/20 overflow-hidden transition-all duration-700 hover:border-[#f7ff00] hover:shadow-[0_0_30px_rgba(247,255,0,0.3)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-black text-[#f7ff00] drop-shadow-lg">
          {count}{suffix}
        </div>
        <div className="text-gray-400 text-sm md:text-base font-medium mt-2">{label}</div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true)
        },
        { threshold: 0.2 }
      )
      if (ref.current) observer.observe(ref.current)
      return () => {
        observer.disconnect()
        clearTimeout(timer)
      }
    }, delay)
  }, [delay])

  return (
    <div 
      ref={ref}
      className={`group relative bg-[#12121a] rounded-2xl p-8 border border-gray-800 transition-all duration-700 hover:border-[#f7ff00] hover:shadow-[0_0_40px_rgba(247,255,0,0.2)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative z-10 text-center">
        <div className="text-5xl mb-6 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-[#f7ff00]">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={`min-h-screen relative overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 transition-all duration-75 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #1a1a2e 0%, #0a0a0f 25%, #0a0a0f 50%, #1a1a2e 75%, #0a0a0f 100%)`
        }}
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #f7ff00 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-25 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #00f7ff 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite 1s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #ff6b00 0%, transparent 70%)', animation: 'float 12s ease-in-out infinite 2s' }}
        />
      </div>

      <div className="absolute inset-0 grid-bg" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-7xl md:text-9xl mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
            🏋️‍♂️
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
            <span className="gradient-text">
              SUJATA GYM
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Transform your body, transform your life. Experience world-class fitness with 
            <span className="text-[#f7ff00] font-semibold"> professional trainers</span>, 
            state-of-the-art equipment, and personalized training programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/services"
              className="group relative px-12 py-5 bg-[#f7ff00] text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(247,255,0,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                ⚡ Start Your Journey
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f7ff00] via-white to-[#f7ff00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/gallery"
              className="group px-12 py-5 bg-transparent text-[#f7ff00] font-bold text-lg rounded-full border-2 border-[#f7ff00] hover:bg-[#f7ff00]/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(247,255,0,0.3)]"
            >
              📸 View Gallery
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <StatCard target={500} label="Happy Members" suffix="+" delay={0} />
            <StatCard target={50} label="Equipment Types" suffix="+" delay={100} />
            <StatCard target={24} label="Access Hours" suffix="/7" delay={200} />
            <StatCard target={5} label="Years Experience" suffix="+" delay={300} />
          </div>
        </div>
      </div>

      <section className="relative py-24 px-4" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Why Choose <span className="gradient-text">Sujata Gym</span>?
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
            Join thousands of satisfied members who have transformed their lives with us
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon="🏆" 
              title="Expert Trainers" 
              description="Certified professional trainers with years of experience to guide you through your fitness journey with personalized attention."
              delay={0}
            />
            <FeatureCard 
              icon="💪" 
              title="Modern Equipment" 
              description="State-of-the-art fitness equipment and facilities to ensure the best workout experience with latest technology."
              delay={150}
            />
            <FeatureCard 
              icon="🤝" 
              title="Community" 
              description="Join a supportive community of fitness enthusiasts who motivate each other to achieve their goals together."
              delay={300}
            />
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-[#12121a] rounded-3xl p-8 md:p-12 border border-[#f7ff00]/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/10 via-transparent to-[#00f7ff]/10" />
            <div className="relative z-10">
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Life?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Start your fitness journey today and get access to world-class facilities and expert guidance.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#f7ff00] text-black font-bold py-4 px-12 rounded-full text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(247,255,0,0.4)]"
              >
                Get Started Now →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
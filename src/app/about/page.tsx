'use client'

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

function ValueCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
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
      className={`group relative bg-[#12121a] rounded-xl p-6 text-center border border-gray-800 transition-all duration-500 hover:border-[#f7ff00] hover:shadow-[0_0_30px_rgba(247,255,0,0.2)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-[#f7ff00]">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function StatCard({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const count = useAnimatedCounter(target)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`bg-[#12121a] rounded-xl p-6 text-center border border-[#f7ff00]/20 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      <div className="text-4xl md:text-5xl font-bold text-[#f7ff00] mb-2">{count}{suffix}</div>
      <div className="text-gray-400 font-medium">{label}</div>
    </div>
  )
}

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen py-20 relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, #f7ff00 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]" style={{ background: 'radial-gradient(circle, #00f7ff 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="text-center mb-16 md:mb-24" aria-labelledby="about-heading">
          <h1 id="about-heading" className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="gradient-text">Sujata Gym</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Where passion meets performance. Discover the story behind our commitment to your fitness journey.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24" aria-labelledby="story-heading">
          <div className="group relative bg-[#12121a] rounded-2xl p-8 border border-gray-800 hover:border-[#f7ff00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,255,0,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
              <h2 id="story-heading" className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span>📖</span> Our Story
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Founded with a vision to revolutionize the fitness industry, Sujata Gym combines
                traditional training methods with cutting-edge technology. Our immersive environment
                provides an unparalleled fitness experience that motivates and engages.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We believe that everyone deserves access to world-class fitness facilities and personalized
                training programs that adapt to their unique goals and lifestyle.
              </p>
            </div>
          </div>

          <div className="group relative bg-[#12121a] rounded-2xl p-8 border border-gray-800 hover:border-[#f7ff00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,255,0,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f7ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span>🎯</span> Our Mission
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                To empower individuals to achieve their fitness goals through innovative technology,
                expert guidance, and a supportive community that celebrates every milestone.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We bridge the gap between aspiration and achievement, making fitness accessible,
                enjoyable, and sustainable for everyone.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 md:mb-24" aria-labelledby="values-heading">
          <h2 id="values-heading" className="text-4xl font-bold text-white text-center mb-4">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            The principles that guide everything we do
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ValueCard 
              icon="🎯" 
              title="Excellence" 
              description="We strive for excellence in every aspect of our service, from equipment quality to trainer expertise."
              delay={0}
            />
            <ValueCard 
              icon="🤝" 
              title="Community" 
              description="Building a supportive community where members motivate and celebrate each other's success."
              delay={150}
            />
            <ValueCard 
              icon="🚀" 
              title="Innovation" 
              description="Embracing cutting-edge technology and methods to enhance the fitness experience."
              delay={300}
            />
          </div>
        </section>

        <section className="relative bg-[#12121a] rounded-2xl p-8 md:p-12 text-center border border-[#f7ff00]/30 overflow-hidden" aria-labelledby="stats-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/10 via-transparent to-[#00f7ff]/10" />
          <div className="relative z-10">
            <h2 id="stats-heading" className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12">
              By The Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <StatCard target={5} label="Years Experience" suffix="+" />
              <StatCard target={500} label="Happy Members" suffix="+" />
              <StatCard target={50} label="Equipment Types" suffix="+" />
              <StatCard target={24} label="Access Hours" suffix="/7" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
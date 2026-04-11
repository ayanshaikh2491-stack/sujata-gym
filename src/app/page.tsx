'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Happy Members' },
  { value: 50, suffix: '+', label: 'Equipment Types' },
  { value: 24, suffix: '/7', label: 'Access Hours' },
  { value: 5, suffix: '+', label: 'Years Experience' }
]

const features = [
  { icon: '🏆', title: 'Expert Trainers', description: 'Certified professionals with years of experience to guide your fitness journey.' },
  { icon: '💪', title: 'Modern Equipment', description: 'State-of-the-art fitness equipment and facilities for the best workout experience.' },
  { icon: '🤝', title: 'Community', description: 'Join a supportive community of fitness enthusiasts achieving goals together.' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
} as const

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          let start = 0
          const duration = 2000
          const startTime = Date.now()
          const update = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(progress * stat.value))
            if (progress < 1) requestAnimationFrame(update)
          }
          update()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [stat.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glow-card rounded-2xl p-6 text-center"
    >
      <div className="text-4xl font-bold text-amber-500 mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-slate-400">{stat.label}</div>
    </motion.div>
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glow-card rounded-2xl p-8 text-center"
    >
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
      <p className="text-slate-400 leading-relaxed">{feature.description}</p>
    </motion.div>
  )
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative overflow-hidden"
    >
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="text-7xl md:text-9xl mb-6">
            🏋️‍♂️
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-8">
            <span className="gradient-text">SUJATA GYM</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Transform your body with <span className="text-amber-500">professional trainers</span>,
            state-of-the-art equipment, and personalized training programs.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/services" className="btn-primary px-10 py-4 rounded-full text-lg">
              Start Your Journey →
            </Link>
            <Link href="/gallery" className="btn-outline px-10 py-4 rounded-full text-lg">
              View Gallery
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">Sujata Gym</span>?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join thousands who have transformed their lives with us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center glow-card rounded-3xl p-10 border-amber-500/30"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Start your fitness journey today with world-class facilities and expert guidance.
          </p>
          <Link href="/contact" className="btn-primary inline-block px-12 py-4 rounded-full text-lg">
            Get Started Now →
          </Link>
        </motion.div>
      </section>
    </motion.div>
  )
}
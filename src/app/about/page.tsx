'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const values = [
  { icon: '🎯', title: 'Excellence', description: 'We strive for excellence in every aspect of our service, from equipment quality to trainer expertise.' },
  { icon: '🤝', title: 'Community', description: 'Building a supportive community where members motivate and celebrate each other\'s success.' },
  { icon: '🚀', title: 'Innovation', description: 'Embracing cutting-edge technology and methods to enhance the fitness experience.' }
]

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Happy Members' },
  { value: 50, suffix: '+', label: 'Equipment Types' },
  { value: 24, suffix: '/7', label: 'Access Hours' }
]

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 relative"
    >
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
      <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="gradient-text">Sujata Gym</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Where passion meets performance. Discover the story behind our commitment to your fitness journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glow-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span>📖</span> Our Story
            </h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Founded with a vision to revolutionize the fitness industry, Sujata Gym combines
              traditional training methods with cutting-edge technology.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We believe everyone deserves access to world-class fitness facilities and personalized
              training programs that adapt to their unique goals.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glow-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span>🎯</span> Our Mission
            </h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              To empower individuals to achieve their fitness goals through innovative technology,
              expert guidance, and a supportive community.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We bridge the gap between aspiration and achievement, making fitness accessible,
              enjoyable, and sustainable for everyone.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="glow-card rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-card rounded-2xl p-10 text-center border-amber-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glow-card rounded-xl p-4">
                <div className="text-3xl font-bold text-amber-500">{stat.value}{stat.suffix}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
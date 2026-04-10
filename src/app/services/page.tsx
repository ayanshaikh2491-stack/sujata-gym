'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Service {
  title: string
  description: string
  icon: string
  features: string[]
}

const services: Service[] = [
  { title: "Personal Training", description: "One-on-one sessions with certified trainers tailored to your goals.", icon: "👨‍🏫", features: ["Custom workout plans", "Nutrition guidance", "Progress tracking"] },
  { title: "Group Classes", description: "High-energy group sessions including yoga, HIIT, and strength training.", icon: "👥", features: ["Variety of class types", "Motivational atmosphere", "All skill levels"] },
  { title: "Strength Training", description: "Build muscle and increase strength with comprehensive weight programs.", icon: "💪", features: ["Free weights & machines", "Olympic lifting", "Form correction"] },
  { title: "Cardio Fitness", description: "Improve cardiovascular health with state-of-the-art cardio equipment.", icon: "❤️", features: ["Treadmills & ellipticals", "Heart rate monitoring", "Various programs"] },
  { title: "Nutrition Counseling", description: "Expert guidance on nutrition to optimize your training results.", icon: "🥗", features: ["Meal planning", "Supplement advice", "Body analysis"] },
  { title: "Recovery & Wellness", description: "Speed up recovery and prevent injury with wellness services.", icon: "🧘", features: ["Massage therapy", "Stretching programs", "Injury prevention"] }
]

const plans = [
  { name: "Basic", price: 29, features: ["24/7 Gym Access", "Basic Equipment", "Locker Room", "Free Parking"], popular: false },
  { name: "Premium", price: 49, features: ["Everything in Basic", "Group Classes", "Personal Training (2x)", "Nutrition Consultation"], popular: true },
  { name: "Elite", price: 89, features: ["Everything in Premium", "Unlimited Training", "Massage Therapy", "VIP Lounge"], popular: false }
]

export default function Services() {
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
      <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive fitness solutions designed to help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glow-card rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-slate-500 text-sm">
                    <span className="text-amber-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Membership <span className="gradient-text">Plans</span>
          </h2>
          <p className="text-slate-400">Choose the plan that fits your fitness goals and budget</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glow-card rounded-2xl p-8 text-center ${plan.popular ? 'border-amber-500' : ''}`}
            >
              {plan.popular && (
                <div className="bg-amber-500 text-slate-900 text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold text-amber-500 mb-6">
                ${plan.price}<span className="text-lg text-slate-400">/month</span>
              </div>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center justify-center text-slate-400">
                    <span className="text-amber-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`btn-primary w-full py-3 rounded-lg block ${plan.popular ? '' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                Choose {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-card rounded-2xl p-10 text-center border-indigo-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of members who have transformed their lives at Sujata Gym.
            Get your first workout free!
          </p>
          <Link href="/contact" className="btn-primary inline-block px-10 py-4 rounded-full text-lg">
            Start Free Trial Today
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
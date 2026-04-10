'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Service {
  title: string
  description: string
  icon: string
  features: string[]
}

const services: Service[] = [
  {
    title: "Personal Training",
    description: "One-on-one sessions with certified trainers tailored to your specific goals and fitness level.",
    icon: "👨‍🏫",
    features: ["Custom workout plans", "Nutrition guidance", "Progress tracking", "Flexible scheduling"]
  },
  {
    title: "Group Classes",
    description: "High-energy group sessions including yoga, HIIT, strength training, and dance fitness.",
    icon: "👥",
    features: ["Variety of class types", "Motivational atmosphere", "Social interaction", "All skill levels welcome"]
  },
  {
    title: "Strength Training",
    description: "Build muscle and increase strength with our comprehensive weight training programs.",
    icon: "💪",
    features: ["Free weights & machines", "Olympic lifting platform", "Progressive overload", "Form correction"]
  },
  {
    title: "Cardio Fitness",
    description: "Improve cardiovascular health with state-of-the-art cardio equipment and programs.",
    icon: "❤️",
    features: ["Treadmills & ellipticals", "Heart rate monitoring", "Variety of programs", "Recovery tracking"]
  },
  {
    title: "Nutrition Counseling",
    description: "Expert guidance on nutrition to fuel your body and optimize your training results.",
    icon: "🥗",
    features: ["Meal planning", "Supplement advice", "Body composition analysis", "Lifestyle coaching"]
  },
  {
    title: "Recovery & Wellness",
    description: "Speed up recovery and prevent injury with our wellness and recovery services.",
    icon: "🧘",
    features: ["Massage therapy", "Stretching programs", "Injury prevention", "Stress management"]
  }
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true)
        },
        { threshold: 0.1 }
      )
      if (ref.current) observer.observe(ref.current)
      return () => {
        observer.disconnect()
        clearTimeout(timer)
      }
    }, index * 100)
  }, [index])

  return (
    <div 
      ref={ref}
      className={`group relative bg-[#12121a] rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:border-[#f7ff00] hover:shadow-[0_0_30px_rgba(247,255,0,0.2)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{service.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-[#f7ff00]">{service.title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

        <ul className="space-y-2">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center text-sm text-gray-500">
              <span className="text-[#f7ff00] mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PricingCard({ plan, price, features, popular = false, index }: { plan: string; price: number; features: string[]; popular?: boolean; index: number }) {
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
    }, index * 150)
  }, [index])

  return (
    <div 
      ref={ref}
      className={`group relative rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(247,255,0,0.3)] ${
        popular 
          ? 'bg-gradient-to-br from-[#f7ff00] to-[#00f7ff] border-2 border-[#f7ff00] relative shadow-[0_0_40px_rgba(247,255,0,0.3)]' 
          : 'bg-[#12121a] border border-gray-800 hover:border-[#f7ff00]'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-[#f7ff00] px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          Most Popular
        </div>
      )}
      <h3 className={`text-2xl font-bold mb-4 ${popular ? 'text-black' : 'text-white'}`}>{plan}</h3>
      <div className={`text-4xl font-bold mb-6 ${popular ? 'text-black' : 'text-[#f7ff00]'}`}>
        ${price}<span className="text-lg font-normal text-gray-400">/month</span>
      </div>
      <ul className={`space-y-2 mb-8 ${popular ? 'text-black' : 'text-gray-400'}`}>
        {features.map((feature, i) => (
          <li key={i} className="flex items-center justify-center">
            <span className={popular ? 'text-black mr-2' : 'text-[#f7ff00] mr-2'}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link 
        href="/contact"
        className={`inline-block w-full font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 ${
          popular 
            ? 'bg-black text-[#f7ff00] hover:bg-gray-900' 
            : 'bg-[#f7ff00] text-black hover:bg-white'
        }`}
      >
        Choose {plan}
      </Link>
    </div>
  )
}

export default function Services() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen py-20 relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, #00f7ff 0%, transparent 70%)' }} />
        <div className="absolute bottom-40 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]" style={{ background: 'radial-gradient(circle, #ff6b00 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="text-center mb-16 md:mb-24" aria-labelledby="services-heading">
          <h1 id="services-heading" className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive fitness solutions designed to help you achieve your goals,
            backed by professional trainers and cutting-edge equipment.
          </p>
        </section>

        <section className="mb-16 md:mb-24" aria-labelledby="services-list-heading">
          <h2 id="services-list-heading" className="sr-only">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </section>

        <section className="mb-16 md:mb-24" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="text-4xl font-bold text-white text-center mb-4">
            Membership <span className="gradient-text">Plans</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Choose the plan that fits your fitness goals and budget
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <PricingCard 
              plan="Basic" 
              price={29} 
              features={["24/7 Gym Access", "Basic Equipment", "Locker Room", "Free Parking"]}
              index={0}
            />
            <PricingCard 
              plan="Premium" 
              price={49} 
              features={["Everything in Basic", "Group Classes", "Personal Training (2x/month)", "Nutrition Consultation", "Towel Service"]}
              popular={true}
              index={1}
            />
            <PricingCard 
              plan="Elite" 
              price={89} 
              features={["Everything in Premium", "Unlimited Personal Training", "Massage Therapy", "VIP Lounge Access", "Guest Privileges"]}
              index={2}
            />
          </div>
        </section>

        <section className="relative bg-[#12121a] rounded-2xl p-8 md:p-12 text-center border border-[#00f7ff]/30 overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f7ff]/10 via-transparent to-[#f7ff00]/10" />
          <div className="relative z-10">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of members who have transformed their lives at Sujata Gym.
              Get your first workout free and experience the difference.
            </p>
            <Link href="/contact" className="inline-block bg-[#f7ff00] text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(247,255,0,0.4)]">
              Start Free Trial Today
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'

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

// Animated service card
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true)
        },
        { threshold: 0.1 }
      )
      const el = document.getElementById(`service-${index}`)
      if (el) observer.observe(el)
      return () => {
        observer.disconnect()
        clearTimeout(timer)
      }
    }, index * 100)
  }, [index])

  return (
    <div 
      id={`service-${index}`}
      className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">{service.icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 hover:text-yellow-400">{service.title}</h3>
      <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

      <ul className="space-y-2">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center text-sm text-gray-400">
            <span className="text-yellow-400 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PricingCard({ plan, price, features, popular = false, index }: { plan: string; price: number; features: string[]; popular?: boolean; index: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true)
        },
        { threshold: 0.2 }
      )
      const el = document.getElementById(`pricing-${index}`)
      if (el) observer.observe(el)
      return () => {
        observer.disconnect()
        clearTimeout(timer)
      }
    }, index * 150)
  }, [index])

  return (
    <div 
      id={`pricing-${index}`}
      className={`rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        popular 
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-400 relative shadow-2xl' 
          : 'bg-white/10 backdrop-blur-md border border-white/20'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          Most Popular
        </div>
      )}
      <h3 className={`text-2xl font-bold mb-4 ${popular ? 'text-black' : 'text-white'}`}>{plan}</h3>
      <div className={`text-4xl font-bold mb-6 ${popular ? 'text-black' : 'text-yellow-400'}`}>
        ${price}<span className="text-lg font-normal">/month</span>
      </div>
      <ul className={`space-y-2 mb-8 ${popular ? 'text-black' : 'text-gray-300'}`}>
        {features.map((feature, i) => (
          <li key={i} className="flex items-center justify-center">
            <span className={popular ? 'text-black mr-2' : 'text-yellow-400 mr-2'}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button 
        className={`w-full font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 ${
          popular 
            ? 'bg-black text-white hover:bg-gray-900' 
            : 'bg-yellow-400 text-black hover:bg-yellow-500'
        }`}
      >
        Choose {plan}
      </button>
    </div>
  )
}

export default function Services() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen py-20 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24" aria-labelledby="services-heading">
          <h1 id="services-heading" className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive fitness solutions designed to help you achieve your goals,
            backed by professional trainers and cutting-edge equipment.
          </p>
        </section>

        {/* Services Grid */}
        <section className="mb-16 md:mb-24" aria-labelledby="services-list-heading">
          <h2 id="services-list-heading" className="sr-only">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </section>

        {/* Membership Plans */}
        <section className="mb-16 md:mb-24" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="text-4xl font-bold text-white text-center mb-4">
            Membership <span className="text-yellow-400">Plans</span>
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have transformed their lives at Sujata Gym.
            Get your first workout free and experience the difference.
          </p>
          <button className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Start Free Trial Today
          </button>
        </section>
      </div>
    </div>
  )
}
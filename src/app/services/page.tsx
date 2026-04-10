export default function Services() {
  const services = [
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

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive fitness solutions designed to help you achieve your goals,
            backed by professional trainers and cutting-edge equipment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                    <span className="text-yellow-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Membership Plans */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Membership Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Basic</h3>
              <div className="text-4xl font-bold text-yellow-400 mb-6">$29<span className="text-lg">/month</span></div>
              <ul className="text-gray-300 space-y-2 mb-8">
                <li>✓ 24/7 Gym Access</li>
                <li>✓ Basic Equipment</li>
                <li>✓ Locker Room</li>
                <li>✓ Free Parking</li>
              </ul>
              <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors">
                Choose Basic
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center border-2 border-yellow-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Premium</h3>
              <div className="text-4xl font-bold text-black mb-6">$49<span className="text-lg">/month</span></div>
              <ul className="text-black space-y-2 mb-8">
                <li>✓ Everything in Basic</li>
                <li>✓ Group Classes</li>
                <li>✓ Personal Training (2x/month)</li>
                <li>✓ Nutrition Consultation</li>
                <li>✓ Towel Service</li>
              </ul>
              <button className="bg-black text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors">
                Choose Premium
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Elite</h3>
              <div className="text-4xl font-bold text-yellow-400 mb-6">$89<span className="text-lg">/month</span></div>
              <ul className="text-gray-300 space-y-2 mb-8">
                <li>✓ Everything in Premium</li>
                <li>✓ Unlimited Personal Training</li>
                <li>✓ Massage Therapy</li>
                <li>✓ VIP Lounge Access</li>
                <li>✓ Guest Privileges</li>
              </ul>
              <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors">
                Choose Elite
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Join thousands of members who have transformed their lives at Sujata Gym.
            Get your first workout free and experience the difference.
          </p>
          <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors">
            Start Free Trial Today
          </button>
        </div>
      </div>
    </div>
  )
}
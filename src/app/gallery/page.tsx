'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const galleryItems = [
  { id: 1, title: "Main Gym Floor", description: "State-of-the-art equipment and spacious workout areas", category: "Facilities" },
  { id: 2, title: "Strength Training Zone", description: "Olympic weightlifting platform and free weights", category: "Equipment" },
  { id: 3, title: "Cardio Area", description: "Latest cardio machines with entertainment systems", category: "Equipment" },
  { id: 4, title: "Group Fitness Studio", description: "Versatile space for yoga, pilates, and group classes", category: "Facilities" },
  { id: 5, title: "Recovery Lounge", description: "Relaxation area with massage chairs and recovery tools", category: "Amenities" },
  { id: 6, title: "Locker Rooms", description: "Modern locker rooms with premium amenities", category: "Amenities" }
]

const categories = ["All", "Facilities", "Equipment", "Amenities"]

const getIcon = (category: string) => {
  switch(category) {
    case 'Facilities': return '🏢'
    case 'Equipment': return '🏋️'
    case 'Amenities': return '🛁'
    default: return '📸'
  }
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 relative"
    >
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 right-20 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-20 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Photo <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explore our state-of-the-art facilities and equipment.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-500 text-slate-900 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glow-card rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-6xl opacity-50">{getIcon(item.category)}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-3">{item.description}</p>
                <span className="inline-block bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-card rounded-2xl p-10 text-center mt-16 border-indigo-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience It Yourself?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Schedule a free tour and start your fitness journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-3 rounded-full">
              📅 Schedule Free Tour
            </button>
            <button className="btn-outline px-8 py-3 rounded-full">
              📞 Call Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
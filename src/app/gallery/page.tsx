'use client'

import { useState, useEffect, useRef } from 'react'

interface GalleryItem {
  id: number
  title: string
  description: string
  category: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Main Gym Floor", description: "State-of-the-art equipment and spacious workout areas", category: "Facilities" },
  { id: 2, title: "Strength Training Zone", description: "Olympic weightlifting platform and free weights", category: "Equipment" },
  { id: 3, title: "Cardio Area", description: "Latest cardio machines with entertainment systems", category: "Equipment" },
  { id: 4, title: "Group Fitness Studio", description: "Versatile space for yoga, pilates, and group classes", category: "Facilities" },
  { id: 5, title: "Recovery Lounge", description: "Relaxation area with massage chairs and recovery tools", category: "Amenities" },
  { id: 6, title: "Locker Rooms", description: "Modern locker rooms with premium amenities", category: "Amenities" }
]

const categories = ["All", "Facilities", "Equipment", "Amenities"]

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const getIcon = (category: string) => {
    switch(category) {
      case 'Facilities': return '🏢'
      case 'Equipment': return '🏋️'
      case 'Amenities': return '🛁'
      default: return '📸'
    }
  }

  return (
    <div 
      ref={ref}
      onClick={onClick}
      className={`group relative bg-[#12121a] rounded-2xl overflow-hidden cursor-pointer border border-gray-800 transition-all duration-300 hover:border-[#f7ff00] hover:shadow-[0_0_30px_rgba(247,255,0,0.2)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 aspect-video bg-gradient-to-br from-gray-800 to-[#0a0a0f] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <div className="text-6xl opacity-50 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{getIcon(item.category)}</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#f7ff00]">{item.title}</h3>
        <p className="text-gray-400 mb-3">{item.description}</p>
        <span className="inline-block bg-[#f7ff00]/20 text-[#f7ff00] px-3 py-1 rounded-full text-sm font-medium border border-[#f7ff00]/30">
          {item.category}
        </span>
      </div>
    </div>
  )
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className={`min-h-screen py-20 relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, #f7ff00 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-20 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]" style={{ background: 'radial-gradient(circle, #00f7ff 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="text-center mb-16" aria-labelledby="gallery-heading">
          <h1 id="gallery-heading" className="text-5xl md:text-6xl font-bold text-white mb-6">
            Photo <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our state-of-the-art facilities and equipment through our professional photo gallery.
          </p>
        </section>

        <section className="flex flex-wrap justify-center gap-4 mb-12" aria-label="Gallery categories">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#f7ff00] text-black shadow-[0_0_20px_rgba(247,255,0,0.4)] scale-105'
                  : 'bg-[#12121a] text-white border border-gray-800 hover:border-[#f7ff00] hover:text-[#f7ff00]'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" aria-label="Gallery images">
          {filteredItems.map((item) => (
            <GalleryCard 
              key={item.id} 
              item={item} 
              onClick={() => console.log(`Clicked: ${item.title}`)} 
            />
          ))}
        </section>

        <section className="mt-16 relative bg-[#12121a] rounded-2xl p-8 text-center border border-[#00f7ff]/30 overflow-hidden" aria-labelledby="visit-cta">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f7ff]/10 via-transparent to-[#f7ff00]/10" />
          <div className="relative z-10">
            <h2 id="visit-cta" className="text-3xl font-bold text-white mb-4">
              Ready to Experience It Yourself?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Visit our gym and see the facilities in person. Schedule a free tour and start your fitness journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#f7ff00] text-black font-bold py-3 px-6 rounded-full hover:bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(247,255,0,0.3)]">
                📅 Schedule Free Tour
              </button>
              <button className="bg-transparent text-[#00f7ff] font-bold py-3 px-6 rounded-full border-2 border-[#00f7ff] hover:bg-[#00f7ff]/10 transition-all duration-300 hover:scale-105">
                📞 Call Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    const el = document.getElementById(`gallery-${item.id}`)
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [item.id])

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
      id={`gallery-${item.id}`}
      onClick={onClick}
      className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="aspect-video bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <div className="text-6xl opacity-50 transform transition-transform duration-300 group-hover:scale-110">{getIcon(item.category)}</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 hover:text-yellow-400">{item.title}</h3>
        <p className="text-gray-300 mb-3">{item.description}</p>
        <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
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
    <div className={`min-h-screen py-20 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16" aria-labelledby="gallery-heading">
          <h1 id="gallery-heading" className="text-5xl md:text-6xl font-bold text-white mb-6">
            Photo <span className="text-yellow-400">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our state-of-the-art facilities and equipment through our professional photo gallery.
          </p>
        </section>

        {/* Coming Soon 3D Notice */}
        <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-center">
            <div className="text-2xl mr-4 animate-pulse">🚧</div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400">3D Experience Coming Soon!</h3>
              <p className="text-gray-200">Interactive 3D gym tour will be available shortly.</p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <section className="flex flex-wrap justify-center gap-4 mb-12" aria-label="Gallery categories">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-black shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        {/* Gallery Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" aria-label="Gallery images">
          {filteredItems.map((item) => (
            <GalleryCard 
              key={item.id} 
              item={item} 
              onClick={() => console.log(`Clicked: ${item.title}`)} 
            />
          ))}
        </section>

        {/* Visit CTA */}
        <section className="mt-16 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-8 text-center shadow-2xl" aria-labelledby="visit-cta">
          <h2 id="visit-cta" className="text-3xl font-bold text-white mb-4">
            Ready to Experience It Yourself?
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Visit our gym and see the facilities in person. Schedule a free tour and start your fitness journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              📅 Schedule Free Tour
            </button>
            <button className="bg-purple-500 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-400 transition-all duration-300 hover:scale-105">
              📞 Call Now
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
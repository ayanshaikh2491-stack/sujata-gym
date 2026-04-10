'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import 3D components
const Gym3DCanvas = dynamic(() => import('@/components/Gym3DScene'), { ssr: false })

const galleryItems = [
  {
    id: 1,
    title: "Main Gym Floor",
    description: "State-of-the-art equipment and spacious workout areas",
    image: "/api/placeholder/400/300",
    category: "Facilities"
  },
  {
    id: 2,
    title: "Strength Training Zone",
    description: "Olympic weightlifting platform and free weights",
    image: "/api/placeholder/400/300",
    category: "Equipment"
  },
  {
    id: 3,
    title: "Cardio Area",
    description: "Latest cardio machines with entertainment systems",
    image: "/api/placeholder/400/300",
    category: "Equipment"
  },
  {
    id: 4,
    title: "Group Fitness Studio",
    description: "Versatile space for yoga, pilates, and group classes",
    image: "/api/placeholder/400/300",
    category: "Facilities"
  },
  {
    id: 5,
    title: "Recovery Lounge",
    description: "Relaxation area with massage chairs and recovery tools",
    image: "/api/placeholder/400/300",
    category: "Amenities"
  },
  {
    id: 6,
    title: "Locker Rooms",
    description: "Modern locker rooms with premium amenities",
    image: "/api/placeholder/400/300",
    category: "Amenities"
  }
]

const categories = ["All", "Facilities", "Equipment", "Amenities"]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [show3D, setShow3D] = useState(true)

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            3D <span className="text-yellow-400">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our gym like never before with immersive 3D visualization
            and explore every corner of our state-of-the-art facility.
          </p>
        </div>

        {/* 3D Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShow3D(!show3D)}
            className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors"
          >
            {show3D ? '🎯 Show Photo Gallery' : '🎮 Show 3D Experience'}
          </button>
        </div>

        {/* 3D Experience */}
        {show3D && (
          <div className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                🏋️‍♀️ Interactive 3D Gym Experience
              </h2>
              <div className="h-96 rounded-xl overflow-hidden">
                <Gym3DCanvas />
              </div>
              <p className="text-gray-300 text-center mt-4">
                Use mouse to rotate, zoom, and explore the gym in 3D!
              </p>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="text-6xl opacity-50">{item.category === 'Facilities' ? '🏢' : item.category === 'Equipment' ? '🏋️' : '🛁'}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-3">{item.description}</p>
                <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Tour CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for a Virtual Tour?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Experience our gym through our immersive 3D environment. Walk through every area,
            interact with equipment, and get a true feel for the space before visiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">
              🎮 Start Virtual Tour
            </button>
            <button className="bg-purple-500 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-400 transition-colors">
              📅 Schedule In-Person Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
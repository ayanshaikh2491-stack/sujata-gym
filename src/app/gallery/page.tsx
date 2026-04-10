import { useState } from 'react'

const galleryItems = [
  {
    id: 1,
    title: "Main Gym Floor",
    description: "State-of-the-art equipment and spacious workout areas",
    category: "Facilities"
  },
  {
    id: 2,
    title: "Strength Training Zone",
    description: "Olympic weightlifting platform and free weights",
    category: "Equipment"
  },
  {
    id: 3,
    title: "Cardio Area",
    description: "Latest cardio machines with entertainment systems",
    category: "Equipment"
  },
  {
    id: 4,
    title: "Group Fitness Studio",
    description: "Versatile space for yoga, pilates, and group classes",
    category: "Facilities"
  },
  {
    id: 5,
    title: "Recovery Lounge",
    description: "Relaxation area with massage chairs and recovery tools",
    category: "Amenities"
  },
  {
    id: 6,
    title: "Locker Rooms",
    description: "Modern locker rooms with premium amenities",
    category: "Amenities"
  }
]

const categories = ["All", "Facilities", "Equipment", "Amenities"]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Photo <span className="text-yellow-400">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our state-of-the-art facilities and equipment through our professional photo gallery.
          </p>
        </div>

        {/* Coming Soon 3D Notice */}
        <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-center">
            <div className="text-2xl mr-4">🚧</div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400">3D Experience Coming Soon!</h3>
              <p className="text-gray-200">Interactive 3D gym tour will be available shortly.</p>
            </div>
          </div>
        </div>

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

        {/* Visit CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience It Yourself?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Visit our gym and see the facilities in person. Schedule a free tour and start your fitness journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">
              📅 Schedule Free Tour
            </button>
            <button className="bg-purple-500 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-400 transition-colors">
              📞 Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
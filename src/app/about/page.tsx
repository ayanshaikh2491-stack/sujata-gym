export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-yellow-400">Sujata Gym</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where passion meets performance. Discover the story behind our commitment to your fitness journey.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded with a vision to revolutionize the fitness industry, Sujata Gym combines
              traditional training methods with cutting-edge technology. Our immersive 3D environment
              provides an unparalleled fitness experience that motivates and engages.
            </p>
            <p className="text-gray-300">
              We believe that everyone deserves access to world-class fitness facilities and personalized
              training programs that adapt to their unique goals and lifestyle.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              To empower individuals to achieve their fitness goals through innovative technology,
              expert guidance, and a supportive community that celebrates every milestone.
            </p>
            <p className="text-gray-300">
              We bridge the gap between aspiration and achievement, making fitness accessible,
              enjoyable, and sustainable for everyone.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-gray-300">
                We strive for excellence in every aspect of our service, from equipment quality to trainer expertise.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-gray-300">
                Building a supportive community where members motivate and celebrate each other's success.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-gray-300">
                Embracing cutting-edge technology and methods to enhance the fitness experience.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-8">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-black">5+</div>
              <div className="text-black/80">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black">500+</div>
              <div className="text-black/80">Happy Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black">50+</div>
              <div className="text-black/80">Equipment Types</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black">24/7</div>
              <div className="text-black/80">Access Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
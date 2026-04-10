'use client'

import { useState, useEffect } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setFormData(initialFormData)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className={`min-h-screen py-20 relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, #f7ff00 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]" style={{ background: 'radial-gradient(circle, #ff6b00 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="text-center mb-16" aria-labelledby="contact-heading">
          <h1 id="contact-heading" className="text-5xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your fitness journey? Get in touch with our team
            for personalized guidance and membership information.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <section className="group relative bg-[#12121a] rounded-2xl p-8 border border-gray-800 hover:border-[#f7ff00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,255,0,0.1)]" aria-labelledby="form-heading">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
              <h2 id="form-heading" className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span>📝</span> Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 animate-bounce">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for contacting us. We'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#0a0a0f] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f7ff00] transition-all ${
                          errors.name ? 'border-red-400' : 'border-gray-700'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#0a0a0f] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f7ff00] transition-all ${
                          errors.email ? 'border-red-400' : 'border-gray-700'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f7ff00] transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        className={`w-full px-4 py-3 bg-[#0a0a0f] border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7ff00] transition-all ${
                          errors.subject ? 'border-red-400' : 'border-gray-700'
                        }`}
                      >
                        <option value="" className="bg-[#0a0a0f]">Select a subject</option>
                        <option value="membership" className="bg-[#0a0a0f]">Membership Inquiry</option>
                        <option value="personal-training" className="bg-[#0a0a0f]">Personal Training</option>
                        <option value="group-classes" className="bg-[#0a0a0f]">Group Classes</option>
                        <option value="general" className="bg-[#0a0a0f]">General Inquiry</option>
                        <option value="feedback" className="bg-[#0a0a0f]">Feedback</option>
                      </select>
                      {errors.subject && <p id="subject-error" className="text-red-400 text-sm mt-1" role="alert">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      rows={6}
                      className={`w-full px-4 py-3 bg-[#0a0a0f] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f7ff00] transition-all resize-none ${
                        errors.message ? 'border-red-400' : 'border-gray-700'
                      }`}
                      placeholder="Tell us about your fitness goals and how we can help..."
                    />
                    {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1" role="alert">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#f7ff00] to-[#00f7ff] text-black font-bold py-4 px-6 rounded-lg hover:from-white hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-[0_0_20px_rgba(247,255,0,0.3)]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </section>

          <div className="space-y-6">
            <section className="group relative bg-[#12121a] rounded-2xl p-8 border border-gray-800 hover:border-[#00f7ff]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,247,255,0.1)]" aria-labelledby="contact-info-heading">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f7ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <h2 id="contact-info-heading" className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>📞</span> Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center hover:bg-[#0a0a0f]/50 p-3 rounded-lg transition-colors">
                    <div className="text-2xl mr-4">📍</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Address</h3>
                      <p className="text-gray-400">123 Fitness Street<br />Gym City, GC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-center hover:bg-[#0a0a0f]/50 p-3 rounded-lg transition-colors">
                    <div className="text-2xl mr-4">📞</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Phone</h3>
                      <p className="text-gray-400">(555) 123-FITNESS</p>
                    </div>
                  </div>

                  <div className="flex items-center hover:bg-[#0a0a0f]/50 p-3 rounded-lg transition-colors">
                    <div className="text-2xl mr-4">✉️</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
                      <p className="text-gray-400">hello@sujatagym.com</p>
                    </div>
                  </div>

                  <div className="flex items-center hover:bg-[#0a0a0f]/50 p-3 rounded-lg transition-colors">
                    <div className="text-2xl mr-4">🕒</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Hours</h3>
                      <p className="text-gray-400">
                        Mon-Fri: 5:00 AM - 11:00 PM<br />
                        Sat-Sun: 7:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="group relative bg-[#12121a] rounded-2xl p-8 border border-gray-800 hover:border-[#ff6b00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]" aria-labelledby="quick-actions-heading">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <h2 id="quick-actions-heading" className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>⚡</span> Quick Actions
                </h2>

                <div className="space-y-4">
                  <button className="w-full bg-[#f7ff00] text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(247,255,0,0.3)]">
                    📅 Schedule Free Consultation
                  </button>

                  <button className="w-full bg-[#0a0a0f] text-white font-bold py-3 px-4 rounded-lg border border-gray-700 hover:border-[#00f7ff] hover:text-[#00f7ff] transition-all duration-300 hover:scale-[1.02]">
                    🎯 Take Membership Tour
                  </button>

                  <button className="w-full bg-[#0a0a0f] text-white font-bold py-3 px-4 rounded-lg border border-gray-700 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-all duration-300 hover:scale-[1.02]">
                    💪 Start Free Trial
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
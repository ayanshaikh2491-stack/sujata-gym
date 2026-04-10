'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.subject) newErrors.subject = 'Please select a subject'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message too short'

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 relative"
    >
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ready to start your fitness journey? Get in touch with our team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glow-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">📝 Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">We'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.name ? 'border-red-400' : 'border-slate-700'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.email ? 'border-red-400' : 'border-slate-700'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.subject ? 'border-red-400' : 'border-slate-700'
                      }`}
                    >
                      <option value="" className="bg-slate-800">Select a subject</option>
                      <option value="membership" className="bg-slate-800">Membership Inquiry</option>
                      <option value="training" className="bg-slate-800">Personal Training</option>
                      <option value="classes" className="bg-slate-800">Group Classes</option>
                      <option value="general" className="bg-slate-800">General Inquiry</option>
                    </select>
                    {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none ${
                      errors.message ? 'border-red-400' : 'border-slate-700'
                    }`}
                    placeholder="Tell us about your fitness goals..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 rounded-lg text-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glow-card rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">📞 Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="text-white font-semibold">Address</h3>
                    <p className="text-slate-400">123 Fitness Street, Gym City, GC 12345</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <p className="text-slate-400">(555) 123-FITNESS</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-slate-400">hello@sujatagym.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h3 className="text-white font-semibold">Hours</h3>
                    <p className="text-slate-400">Mon-Fri: 5AM - 11PM<br/>Sat-Sun: 7AM - 9PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glow-card rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">⚡ Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full btn-primary py-3 rounded-lg">
                  📅 Schedule Free Consultation
                </button>
                <button className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors">
                  🎯 Take Membership Tour
                </button>
                <button className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors">
                  💪 Start Free Trial
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/about', label: 'About', icon: '📖' },
  { href: '/services', label: 'Services', icon: '💪' },
  { href: '/gallery', label: 'Gallery', icon: '📸' },
  { href: '/contact', label: 'Contact', icon: '📞' }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-amber-500/5' 
            : 'bg-slate-900/80 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl">🏋️‍♂️</span>
              <span className="text-white font-bold text-xl md:text-2xl">
                <span className="text-amber-500">SUJATA</span>GYM
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-300 hover:text-amber-500 px-4 py-2 rounded-lg hover:bg-amber-500/10 transition-all duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-amber-500/10"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden pb-4">
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl mt-2 overflow-hidden border border-slate-700">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-5 py-4 text-white hover:text-amber-500 hover:bg-amber-500/10 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-16 md:pt-20">
        {children}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <span className="text-2xl">🏋️‍♂️</span>
                <span className="text-white font-bold text-xl">
                  <span className="text-amber-500">SUJATA</span>GYM
                </span>
              </div>
              <p className="text-slate-400 text-sm">Building Strength, Building Lives</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/services" className="block text-slate-400 hover:text-amber-500 text-sm">Services</Link>
                <Link href="/gallery" className="block text-slate-400 hover:text-amber-500 text-sm">Gallery</Link>
                <Link href="/contact" className="block text-slate-400 hover:text-amber-500 text-sm">Contact</Link>
                <Link href="/about" className="block text-slate-400 hover:text-amber-500 text-sm">About</Link>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-slate-400 text-sm">hello@sujatagym.com</p>
              <p className="text-slate-400 text-sm">(555) 123-FITNESS</p>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-500 text-xs">
              © 2026 <span className="text-amber-500">SUJATA</span>GYM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
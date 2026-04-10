'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

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

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '📖' },
    { href: '/services', label: 'Services', icon: '💪' },
    { href: '/gallery', label: 'Gallery', icon: '📸' },
    { href: '/contact', label: 'Contact', icon: '📞' }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#f7ff00]/20' 
            : 'bg-[#0a0a0f]/60 backdrop-blur-lg'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center gap-2 group"
              >
                <span className="text-3xl transition-transform duration-300 group-hover:rotate-12">🏋️‍♂️</span>
                <span className="text-white font-bold text-xl md:text-2xl">
                  <span className="text-[#f7ff00]">SUJATA</span>
                  <span className="text-white">GYM</span>
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-[#f7ff00] px-4 py-2 rounded-lg hover:bg-[#f7ff00]/10 transition-all duration-300 font-medium text-sm uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 rounded-lg hover:bg-[#f7ff00]/10 transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
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
          </div>

          {isMenuOpen && (
            <div className="lg:hidden pb-4">
              <div className="bg-[#12121a]/90 backdrop-blur-xl rounded-2xl mt-2 overflow-hidden border border-[#f7ff00]/20">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-5 py-4 text-white hover:text-[#f7ff00] hover:bg-[#f7ff00]/10 transition-all duration-200 font-medium"
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

      <footer className="bg-[#0a0a0f] border-t border-[#f7ff00]/20" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <span className="text-2xl">🏋️‍♂️</span>
                <span className="text-white font-bold text-xl">
                  <span className="text-[#f7ff00]">SUJATA</span>GYM
                </span>
              </div>
              <p className="text-gray-400 text-sm">Building Strength, Building Lives</p>
              <p className="text-gray-500 text-xs mt-2">Transform your body, transform your life.</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/services" className="block text-gray-400 hover:text-[#f7ff00] text-sm transition-colors">Services</Link>
                <Link href="/gallery" className="block text-gray-400 hover:text-[#f7ff00] text-sm transition-colors">Gallery</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-[#f7ff00] text-sm transition-colors">Contact</Link>
                <Link href="/about" className="block text-gray-400 hover:text-[#f7ff00] text-sm transition-colors">About</Link>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">hello@sujatagym.com</p>
              <p className="text-gray-400 text-sm">(555) 123-FITNESS</p>
              <div className="flex justify-center md:justify-end gap-3 mt-4">
                <a href="#" className="text-gray-400 hover:text-[#f7ff00] text-xl transition-colors">📘</a>
                <a href="#" className="text-gray-400 hover:text-[#f7ff00] text-xl transition-colors">📸</a>
                <a href="#" className="text-gray-400 hover:text-[#f7ff00] text-xl transition-colors">🐦</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-xs">
              © 2026 <span className="text-[#f7ff00]">SUJATA</span>GYM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
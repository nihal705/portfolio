// frontend/src/components/common/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { profileData } from '../../data/profile'
import LogoMyCodeNotes from './LogoMyCodeNotes'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navItems = ['About', 'Projects', 'Skills', 'Contact']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, 'hero')}
            className="text-xl font-display font-bold cursor-pointer"
          >
            <span className="text-white">Nihal</span>
            <span className="text-accent-gold">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-300 hover:text-accent-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="https://mycodenotes.vercel.app"
              target="_blank"
              rel="noopener"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <LogoMyCodeNotes />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={toggleMenu} className="md:hidden text-gray-300 hover:text-white">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="block py-2 text-sm text-gray-300 hover:text-accent-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="https://mycodenotes.vercel.app"
                target="_blank"
                rel="noopener"
                className="text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                onClick={closeMenu}
              >
                <LogoMyCodeNotes />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
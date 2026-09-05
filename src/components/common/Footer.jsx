import { SiLeetcode } from 'react-icons/si'
import { profileData } from '../../data/profile'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {profileData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
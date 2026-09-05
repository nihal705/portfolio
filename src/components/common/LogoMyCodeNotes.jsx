// frontend/src/components/common/LogoMyCodeNotes.jsx
const LogoMyCodeNotes = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="26"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
      >
        {/* Circle background – uses current text color */}
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
        
        {/* Code symbol – uses current text color */}
        <path d="M12 11L8 16L12 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 11L24 16L20 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Center dot – uses current text color */}
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    </div>
  )
}

export default LogoMyCodeNotes
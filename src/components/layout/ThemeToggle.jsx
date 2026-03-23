import React from 'react'
import { Moon, SunMedium } from 'lucide-react'

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label="Cambiar tema"
      type="button"
    >
      {isDarkMode ? <SunMedium size={18} /> : <Moon size={18} />}
      <span>{isDarkMode ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  )
}

export default ThemeToggle

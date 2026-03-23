import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('catalog-theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('catalog-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
  }
}

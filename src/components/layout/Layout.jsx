import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import { useTheme } from '../../shared/hooks/useTheme.jsx'

const Layout = ({ children, onSync, syncing, cartCount = 0 }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [])

  const toggleSidebar = () => setSidebarOpen((current) => !current)

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar
        toggleSidebar={toggleSidebar}
        cartCount={cartCount}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onSync={onSync}
        syncing={syncing}
      />

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onSync={onSync}
        syncing={syncing}
      />

      <main className="main-shell transition-all duration-300">
        {children}
      </main>
    </div>
  )
}

export default Layout

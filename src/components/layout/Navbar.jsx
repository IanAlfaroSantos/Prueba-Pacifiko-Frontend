import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, ShoppingCart, Boxes, RefreshCcw } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'

const Navbar = ({ toggleSidebar, cartCount, isDarkMode, toggleTheme, onSync, syncing }) => {
  return (
    <header className="app-navbar shadow-lg fixed w-full z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="navbar-icon-btn"
            type="button"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="brand-link no-underline hover:no-underline">
            <div className="brand-icon-wrapper">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] opacity-70 mb-0">Catálogo</p>
              <h1 className="text-lg md:text-xl font-bold mb-0">Pacifiko</h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onSync}
            type="button"
            className="navbar-action-btn hidden sm:flex"
            disabled={syncing}
          >
            <RefreshCcw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Sincronizando...' : 'Sincronizar'}</span>
          </button>

          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

          <Link to="/cart" className="cart-link no-underline hover:no-underline">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar

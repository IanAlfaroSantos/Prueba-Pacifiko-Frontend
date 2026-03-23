import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, LayoutDashboard, ShoppingCart, RefreshCcw, Info } from 'lucide-react'

const Sidebar = ({ isOpen, toggleSidebar, onSync, syncing }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const sections = [
    {
      text: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      action: () => navigate('/'),
      path: '/',
    },
    {
      text: 'Carrito',
      icon: <ShoppingCart className="h-5 w-5" />,
      action: () => navigate('/cart'),
      path: '/cart',
    },
    {
      text: syncing ? 'Sincronizando...' : 'Sincronizar catálogo',
      icon: <RefreshCcw className={`h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />,
      action: onSync,
      path: null,
    },
  ]

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      <aside className={`app-sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h2 className="text-xl font-semibold mb-0">Menú</h2>
            <p className="text-sm opacity-70 mb-0">Vista general del catálogo</p>
          </div>
          <button
            onClick={toggleSidebar}
            className="navbar-icon-btn"
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {sections.map((section, index) => {
            const isActive = section.path && location.pathname === section.path

            return (
              <button
                key={`${section.text}-${index}`}
                onClick={() => {
                  section.action()
                  toggleSidebar()
                }}
                type="button"
                className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
              >
                <span className="sidebar-icon">{section.icon}</span>
                <span>{section.text}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-white/10 text-sm opacity-80 flex gap-2 items-start">
          <Info className="h-4 w-4 mt-0.5" />
          <p className="mb-0">Cambia la URL del backend en <strong>src/services/api.jsx</strong> cuando lo subas a producción.</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

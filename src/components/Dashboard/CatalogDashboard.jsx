import React, { useEffect, useMemo, useState } from 'react'
import { Filter, Package, RefreshCcw, Search, ShoppingBag, ShoppingCart, Sparkles } from 'lucide-react'
import Layout from '../layout/Layout.jsx'
import ProductCard from '../Catalog/ProductCard.jsx'
import { useProducts } from '../../shared/hooks/useProducts.jsx'
import { useCart } from '../../shared/hooks/useCart.jsx'

const PAGE_SIZE = 8

const CatalogDashboard = () => {
  const {
    products,
    total,
    loading,
    syncing,
    categoryOptions,
    handleGetProducts,
    handleSyncProducts,
  } = useProducts()

  const {
    cart,
    totalItems,
    totalAmount,
    handleGetCart,
    handleAddToCart,
  } = useCart()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    handleGetProducts(100, 0)
    handleGetCart()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const pagesCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const currentProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    if (page > pagesCount) {
      setPage(1)
    }
  }, [page, pagesCount])

  const stats = useMemo(() => {
    const categories = new Set(products.map((product) => product.category)).size
    const average = products.length
      ? products.reduce((acc, product) => acc + Number(product.price), 0) / products.length
      : 0

    return {
      products: total || products.length,
      categories,
      average,
      cartAmount: totalAmount,
    }
  }, [products, total, totalAmount])

  const handleSync = async () => {
    await handleSyncProducts()
    await handleGetCart()
  }

  const handleQuickAdd = async (id, quantity) => {
    await handleAddToCart(id, quantity)
  }

  return (
    <Layout onSync={handleSync} syncing={syncing} cartCount={totalItems}>
      <div className="container mx-auto px-4 py-4 py-lg-5">
        <section className="hero-panel animate__animated animate__fadeInDown">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h2 className="hero-title">Catálogo de productos</h2>
            </div>

            <button
              type="button"
              className="primary-action"
              onClick={handleSync}
              disabled={syncing}
            >
              <RefreshCcw size={17} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Sincronizando...' : 'Sincronizar catálogo'}
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-4 my-lg-5">
          <div className="stat-card">
            <div className="stat-icon bg-blue-500/15 text-blue-400"><Package size={20} /></div>
            <div>
              <p className="stat-label">Productos</p>
              <h3 className="stat-value">{stats.products}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-emerald-500/15 text-emerald-400"><Filter size={20} /></div>
            <div>
              <p className="stat-label">Categorías</p>
              <h3 className="stat-value">{stats.categories}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-amber-500/15 text-amber-400"><ShoppingBag size={20} /></div>
            <div>
              <p className="stat-label">Precio promedio</p>
              <h3 className="stat-value">${stats.average.toFixed(2)}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-fuchsia-500/15 text-fuchsia-400"><ShoppingCart size={20} /></div>
            <div>
              <p className="stat-label">Valor carrito</p>
              <h3 className="stat-value">${stats.cartAmount.toFixed(2)}</h3>
            </div>
          </div>
        </section>

        <section className="content-panel mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,0.9fr] gap-3">
            <div className="search-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar producto por nombre..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="search-input"
              />
            </div>

            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="all">Todas las categorías</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </section>

        {loading ? (
          <div className="empty-state text-center">
            <div className="spinner-border text-primary mb-3" role="status" />
            <h3 className="empty-title">Cargando catálogo...</h3>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="empty-state text-center">
            <h3 className="empty-title">No hay productos para mostrar</h3>
            <p className="empty-description">Sincroniza o ajusta los filtros para ver resultados.</p>
            <button type="button" className="primary-action mx-auto" onClick={handleSync}>
              <RefreshCcw size={16} />
              Sincronizar ahora
            </button>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleQuickAdd}
                />
              ))}
            </section>

            <section className="pagination-shell mt-4">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
              >
                Anterior
              </button>

              <span className="pagination-label">Página {page} de {pagesCount}</span>

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setPage((current) => Math.min(pagesCount, current + 1))}
                disabled={page === pagesCount}
              >
                Siguiente
              </button>
            </section>
          </>
        )}

        <section className="content-panel mt-4">
          <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
            <div>
              <h4 className="section-title mb-1">Resumen del carrito</h4>
            </div>
            <div className="flex gap-4 flex-wrap">
              <span className="summary-pill">Items: {totalItems}</span>
              <span className="summary-pill">Registros: {cart.length}</span>
              <span className="summary-pill">Total: ${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CatalogDashboard

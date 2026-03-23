import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Package, ShoppingCart, Tag } from 'lucide-react'
import Layout from '../layout/Layout.jsx'
import { useProducts } from '../../shared/hooks/useProducts.jsx'
import { useCart } from '../../shared/hooks/useCart.jsx'

const ProductDetail = () => {
  const { id } = useParams()
  const { product, loading, syncing, handleGetProductById, handleSyncProducts } = useProducts()
  const { totalItems, handleGetCart, handleAddToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    handleGetProductById(id)
    handleGetCart()
  }, [id])

  const handleSync = async () => {
    await handleSyncProducts()
    await handleGetProductById(id)
    await handleGetCart()
  }

  const handleAdd = async () => {
    await handleAddToCart(Number(id), quantity)
    await handleGetCart()
  }

  return (
    <Layout onSync={handleSync} syncing={syncing} cartCount={totalItems}>
      <div className="container mx-auto px-4 py-4 py-lg-5">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 secondary-action no-underline">
            <ArrowLeft size={16} />
            Volver al catálogo
          </Link>
        </div>

        {loading || !product ? (
          <div className="empty-state text-center">
            <div className="spinner-border text-primary mb-3" role="status" />
            <h3 className="empty-title">Cargando detalle del producto...</h3>
          </div>
        ) : (
          <section className="detail-panel animate__animated animate__fadeInUp">
            <div className="grid grid-cols-1 xl:grid-cols-[1.1fr,0.9fr] gap-4 md:gap-5">
              <div className="detail-visual">
                <div className="detail-visual-badge">
                  <Package size={18} />
                  Producto #{product.id}
                </div>
                <h2 className="detail-title">{product.name}</h2>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="category-pill"><Tag size={14} />{product.category}</span>
                  <span className="summary-pill">Fuente: {product.source}</span>
                  <span className="summary-pill">Alta: {new Date(product.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="content-panel">
                <p className="section-subtitle mb-2">Precio actual</p>
                <div className="detail-price mb-4">${Number(product.price).toFixed(2)}</div>

                <div className="mb-4">
                  <label className="detail-label mb-2">Cantidad</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                      className="qty-input"
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQuantity((current) => current + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button type="button" className="primary-action w-full justify-center" onClick={handleAdd}>
                  <ShoppingCart size={16} />
                  Agregar al carrito
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

export default ProductDetail

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import Layout from '../layout/Layout.jsx'
import { useCart } from '../../shared/hooks/useCart.jsx'
import { useProducts } from '../../shared/hooks/useProducts.jsx'

const CartView = () => {
  const {
    cart,
    loading,
    totalItems,
    totalAmount,
    handleGetCart,
    handleDeleteCartItem,
    handleClearCart,
  } = useCart()

  const { syncing, handleSyncProducts } = useProducts()

  useEffect(() => {
    handleGetCart()
  }, [])

  const handleSync = async () => {
    await handleSyncProducts()
    await handleGetCart()
  }

  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar item?',
      text: 'El producto se eliminará del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#111827',
      color: '#fff',
    })

    if (result.isConfirmed) {
      await handleDeleteCartItem(id)
    }
  }

  const confirmClear = async () => {
    const result = await Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Se eliminarán todos los items.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
      background: '#111827',
      color: '#fff',
    })

    if (result.isConfirmed) {
      await handleClearCart()
    }
  }

  return (
    <Layout onSync={handleSync} syncing={syncing} cartCount={totalItems}>
      <div className="container mx-auto px-4 py-4 py-lg-5">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 secondary-action no-underline mb-3">
              <ArrowLeft size={16} />
              Volver al catálogo
            </Link>
            <h2 className="hero-title mb-2">Carrito de compras</h2>
            <p className="hero-description mb-0">Vista conectada a los endpoints del carrito de tu backend.</p>
          </div>

          {cart.length > 0 && (
            <button type="button" className="danger-action" onClick={confirmClear}>
              <Trash2 size={16} />
              Vaciar carrito
            </button>
          )}
        </div>

        <section className="grid grid-cols-1 xl:grid-cols-[1.2fr,0.8fr] gap-4">
          <div className="content-panel">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status" />
                <h3 className="empty-title">Cargando carrito...</h3>
              </div>
            ) : cart.length === 0 ? (
              <div className="empty-state text-center">
                <ShoppingCart className="mx-auto mb-3 opacity-60" size={44} />
                <h3 className="empty-title">Tu carrito está vacío</h3>
                <p className="empty-description">Agrega productos desde el catálogo para verlos aquí.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <article key={item.id} className="cart-item-row">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-1">Producto #{item.product_id}</p>
                      <h3 className="cart-item-title mb-1">{item.name}</h3>
                      <p className="cart-item-meta mb-0">
                        ${Number(item.price).toFixed(2)} x {item.quantity}
                      </p>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </div>

                    <div className="text-end flex flex-col gap-2 items-end">
                      <strong className="cart-item-subtotal">${Number(item.subtotal).toFixed(2)}</strong>
                      <button
                        type="button"
                        className="icon-danger-btn"
                        onClick={() => confirmDelete(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="content-panel sticky-summary">
            <p className="section-subtitle mb-2">Resumen</p>
            <div className="summary-box mb-3">
              <div className="summary-line">
                <span>Items</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-line">
                <span>Registros</span>
                <strong>{cart.length}</strong>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <strong>${totalAmount.toFixed(2)}</strong>
              </div>
            </div>

            <Link to="/" className="primary-action w-full justify-center no-underline">
              Seguir comprando
            </Link>
          </aside>
        </section>
      </div>
    </Layout>
  )
}

export default CartView

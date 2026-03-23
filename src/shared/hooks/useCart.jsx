import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { addToCart, clearCart, deleteCartItem, getCart } from '../../services/api.jsx'

const alertTheme = {
  background: '#111827',
  color: '#fff',
}

export const useCart = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  const showErrorAlert = (error) => {
    const backendError = error.response?.data
    Swal.fire({
      title: 'Error',
      text: backendError?.error || backendError?.message || 'No se pudo completar la operación.',
      icon: 'error',
      ...alertTheme,
    })
  }

  const handleGetCart = async () => {
    setLoading(true)
    try {
      const response = await getCart()
      setCart(response.data.cart || [])
    } catch (error) {
      showErrorAlert(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId, quantity = 1, shouldRefresh = true) => {
    setLoading(true)
    try {
      await addToCart({ productId, quantity })
      if (shouldRefresh) {
        await handleGetCart()
      }
      Swal.fire({
        title: 'Carrito actualizado',
        text: 'El producto se agregó correctamente.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
        ...alertTheme,
      })
    } catch (error) {
      showErrorAlert(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCartItem = async (id) => {
    setLoading(true)
    try {
      await deleteCartItem(id)
      await handleGetCart()
      Swal.fire({
        title: 'Item eliminado',
        text: 'El producto se eliminó del carrito.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
        ...alertTheme,
      })
    } catch (error) {
      showErrorAlert(error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearCart = async () => {
    setLoading(true)
    try {
      await clearCart()
      setCart([])
      Swal.fire({
        title: 'Carrito vaciado',
        text: 'Se eliminaron todos los productos.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
        ...alertTheme,
      })
    } catch (error) {
      showErrorAlert(error)
    } finally {
      setLoading(false)
    }
  }

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + Number(item.quantity || 0), 0),
    [cart],
  )

  const totalAmount = useMemo(
    () => cart.reduce((acc, item) => acc + Number(item.subtotal || 0), 0),
    [cart],
  )

  return {
    cart,
    loading,
    totalItems,
    totalAmount,
    handleGetCart,
    handleAddToCart,
    handleDeleteCartItem,
    handleClearCart,
  }
}

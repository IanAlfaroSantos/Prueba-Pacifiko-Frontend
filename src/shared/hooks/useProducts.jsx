import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { getProductById, getProducts, syncProducts } from '../../services/api.jsx'

const alertTheme = {
  background: '#111827',
  color: '#fff',
}

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [total, setTotal] = useState(0)

  const showErrorAlert = (error) => {
    const backendError = error.response?.data
    Swal.fire({
      title: 'Error',
      text: backendError?.error || backendError?.message || 'No se pudo completar la operación.',
      icon: 'error',
      ...alertTheme,
    })
  }

  const handleGetProducts = async (limite = 100, desde = 0) => {
    setLoading(true)
    try {
      const response = await getProducts(limite, desde)
      setProducts(response.data.products || [])
      setTotal(response.data.total || 0)
    } catch (error) {
      showErrorAlert(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSyncProducts = async () => {
    setSyncing(true)
    try {
      await syncProducts()
      await handleGetProducts(100, 0)
      Swal.fire({
        title: 'Catálogo sincronizado',
        text: 'Los productos se actualizaron correctamente.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        ...alertTheme,
      })
    } catch (error) {
      showErrorAlert(error)
    } finally {
      setSyncing(false)
    }
  }

  const handleGetProductById = async (id) => {
    setLoading(true)
    try {
      const response = await getProductById(id)
      setProduct(response.data.product || null)
    } catch (error) {
      showErrorAlert(error)
    } finally {
      setLoading(false)
    }
  }

  const categoryOptions = useMemo(() => {
    return [...new Set(products.map((item) => item.category))].sort((a, b) => a.localeCompare(b))
  }, [products])

  return {
    products,
    product,
    total,
    loading,
    syncing,
    categoryOptions,
    handleGetProducts,
    handleSyncProducts,
    handleGetProductById,
  }
}

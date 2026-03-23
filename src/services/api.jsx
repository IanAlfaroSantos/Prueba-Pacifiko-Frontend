import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
})

export const syncProducts = async () => {
  return await apiClient.get('products/sync')
}

export const getProducts = async (limite = 100, desde = 0) => {
  return await apiClient.get(`products?limite=${limite}&desde=${desde}`)
}

export const getProductById = async (id) => {
  return await apiClient.get(`products/${id}`)
}

export const addToCart = async (data) => {
  return await apiClient.post('cart', data)
}

export const getCart = async () => {
  return await apiClient.get('cart')
}

export const deleteCartItem = async (id) => {
  return await apiClient.delete(`cart/${id}`)
}

export const clearCart = async () => {
  return await apiClient.delete('cart')
}

export default apiClient

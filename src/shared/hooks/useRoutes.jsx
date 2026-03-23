import { useRoutes } from 'react-router-dom'
import Dashboard from '../../components/Dashboard/Dashboard.jsx'
import ProductDetail from '../../components/Catalog/ProductDetail.jsx'
import CartView from '../../components/Cart/CartView.jsx'

export const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Dashboard /> },
    { path: '/products/:id', element: <ProductDetail /> },
    { path: '/cart', element: <CartView /> },
  ])

  return routes
}

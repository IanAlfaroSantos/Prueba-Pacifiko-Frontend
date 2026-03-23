import Dashboard from './components/Dashboard/Dashboard.jsx'
import ProductDetail from './components/Catalog/ProductDetail.jsx'
import CartView from './components/Cart/CartView.jsx'

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/products/:id',
    element: <ProductDetail />,
  },
  {
    path: '/cart',
    element: <CartView />,
  },
]

export default routes

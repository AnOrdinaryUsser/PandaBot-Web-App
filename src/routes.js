import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AdminDashboard = React.lazy(() => import('./views/dashboard/AdminDashboard'))
const Tables = React.lazy(() => import('./views/tables/Tables'))
const Map = React.lazy(() => import('./views/map/Map'))
const Cart = React.lazy(() => import('./views/cart/Cart'))
const Orders = React.lazy(() => import('./views/orders/Orders'))
const Sections = React.lazy(() => import('./views/sections/Sections'))

const routes = [
  { path: '/', exact: true, name: 'Login' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/adminDashboard', name: 'AdminDashboard', element: AdminDashboard },
  { path: '/tables', name: 'Tables', element: Tables },
  { path: '/map', name: 'Map', element: Map },
  { path: '/cart', name: 'Cart', element: Cart },
  { path: '/sections', name: 'Sections', element: Sections },
  { path: '/orders', name: 'Orders', element: Orders },
]

export default routes

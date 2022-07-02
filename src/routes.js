import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AdminDashboard = React.lazy(() => import('./views/dashboard/AdminDashboard'))

//Own
const Tables1 = React.lazy(() => import('./views/tables/Tables1'))
const Map = React.lazy(() => import('./views/map/Map'))
const Carta = React.lazy(() => import('./views/carta/Carta'))
const Pedidos = React.lazy(() => import('./views/pedidos/Pedidos'))
const Secciones = React.lazy(() => import('./views/secciones/Secciones'))

const routes = [
  { path: '/', exact: true, name: 'Login' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/adminDashboard', name: 'AdminDashboard', element: AdminDashboard },
  { path: '/tables', name: 'Tables1', element: Tables1 },
  { path: '/map', name: 'Map', element: Map },
  { path: '/carta', name: 'Carta', element: Carta },
  { path: '/secciones', name: 'Secciones', element: Secciones },
  { path: '/pedidos', name: 'Pedidos', element: Pedidos },
]

export default routes

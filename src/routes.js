import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Own
const Tables1 = React.lazy(() => import('./views/tables/Tables1'))
const Map = React.lazy(() => import('./views/map/Map'))
const Carta = React.lazy(() => import('./views/carta/Carta'))
const Pedidos = React.lazy(() => import('./views/pedidos/Pedidos'))

const routes = [
  { path: '/', exact: true, name: 'Login' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tables', name: 'Tables1', element: Tables1 },
  { path: '/map', name: 'Map', element: Map },
  { path: '/carta', name: 'Carta', element: Carta },
  { path: '/pedidos', name: 'Pedidos', element: Pedidos },
]

export default routes

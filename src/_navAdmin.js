import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilMap,
  cilDinner,
  cilBorderAll,
  cilList ,
  cilPeople,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavTitle,
    name: "Servicio de Mesas",
  },
  {
    component: CNavItem,
    name: 'Mapa',
    to: '/map',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mesas',
    to: '/tables',
    icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Productos",
  },
  {
    component: CNavItem,
    name: 'Carta',
    to: '/carta',
    icon: <CIcon icon={cilDinner} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Secciones',
    to: '/secciones',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pedidos',
    to: '/pedidos',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Perfil",
  },
  {
    component: CNavItem,
    name: 'Mis datos',
    to: '/dashboard',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Administrar usuarios",
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/AdminDashboard',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav

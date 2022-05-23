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
  cilList 
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
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
    component: CNavItem,
    name: 'Carta',
    to: '/carta',
    icon: <CIcon icon={cilDinner} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pedidos',
    to: '/pedidos',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Empleados',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
]

export default _nav

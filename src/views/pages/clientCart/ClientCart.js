import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNavItem,
  CNavLink,
  CNav,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  return (
    <CNav className="justify-content-center">
        <CNavItem>
          <CNavLink>Entrantes</CNavLink>
        </CNavItem>
        <CNavItem>
            <CNavLink>Platos</CNavLink>
        </CNavItem>
        <CNavItem>
            <CNavLink >Postres</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>Refrescos</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>Bebidas Alcoholicas</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>Vinos</CNavLink>
        </CNavItem>
    </CNav>
  )
}

export default Login

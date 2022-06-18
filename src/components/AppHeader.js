import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CAvatar
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilExitToApp } from '@coreui/icons'
import profile from './../assets/images/avatars/1.jpeg'


import { useNavigate } from 'react-router-dom'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import axios from 'axios';


const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const navigate = useNavigate()

  const Logout = async () => {
    try {
        await axios.delete('http://localhost:9000/logout');
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>


        <CHeaderToggler>
          <CIcon icon={cilBell} size="lg" />
        </CHeaderToggler>
        
        <CHeaderToggler
          className="ps-1"
          onClick={Logout}
        >
          <CIcon style={{color:"red"}} icon={cilExitToApp} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="ms-3">
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
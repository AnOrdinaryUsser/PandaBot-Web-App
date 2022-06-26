import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilExitToApp } from '@coreui/icons'

import { useNavigate } from 'react-router-dom'

import { logo } from 'src/assets/brand/logo'
import axios from 'axios';


const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const navigate = useNavigate()

  const Logout = async () => {
    try {
        await axios.delete('http://192.168.1.50:9000/logout');
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
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>
        <CHeaderToggler>
        </CHeaderToggler>
        <CHeaderToggler
          className="ps-1"
          onClick={Logout}>
          <CIcon style={{color:"red"}} icon={cilExitToApp} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="ms-3">
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
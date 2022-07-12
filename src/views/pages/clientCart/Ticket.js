import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import image from "./../../../assets/images/backgroundLogin.jpg"
import { getCart } from "../../../services/CartService.js";

const Register = () => {
 
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
                  <h1 className='text-center mb-3'>Te hemos enviado un correo con tu contraseña</h1>
                  <p className='text-center mb-3'>Revisa tu bandeja para ver si ha llegado correctamente el correo</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-center">
                    <Link to="/login">
                        <CButton color="secondary" aria-pressed="true">Volver al inicio</CButton>
                    </Link>
                  </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

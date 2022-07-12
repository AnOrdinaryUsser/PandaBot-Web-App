import React, {useState, useRef} from 'react';
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



const Register = () => {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false)
    const [msg, setMsg] = useState('');
    

    const forgotPassword = async (e) => {
        console.log(email.value)
        const form = e.currentTarget
        if (form.checkValidity() === false) {
          e.preventDefault()
          e.stopPropagation()
        }
        setValidated(true)
    
        try {
          await axios.post('http://192.168.1.128:9000/recoverPassword', {
            email: email.value
          });
          window.location.replace("http://192.168.1.128:3000/SentEmail");
          //navigate("/")
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          }
      } 
    }

  return (
    <div style={{backgroundImage: `url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm 
                  validated={validated}
                  onSubmit={forgotPassword}>
                  <h4 className='text-center mb-3'>Introduce tu correo</h4>
                  <CInputGroup className="align-content-center mb-3">
                    <CFormInput 
                    placeholder="Email" 
                    id="email" 
                    type="email"
                    required />
                  </CInputGroup>
                  <div className="d-grid gap-2 d-md-flex justify-content-end">
                    <CButton type="submit" color="success" aria-pressed="true">Enviar</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

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

const Register = () => {
 
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  // Validate form
  const [validated, setValidated] = useState(false)
  // Event to validate form
  /* const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    // Picking data
    e.preventDefault();
    const {user, email, pass, repeatPass} = e.target.elements
    console.log(user.value, email.value, pass.value)

    // Formdata on JSON 
    const data = {name: user.value, email: email.value, password: pass.value, confirmPassword: repeatPass.value}
    const JSONdata = JSON.stringify(data)
    console.log(JSONdata)

    // Make a fetch
    fetch('http://localhost:9000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(data),
    })
    .then(res => console.log(res.text()))
    .then(data => {
      // enter you logic when the fetch is successful
      console.log(data)
    })
    .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    })  
  } */

  const Register = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    e.preventDefault();
    try {
        await axios.post('http://localhost:9000/users', {
            name: user.value,
            email: email.value,
            password: pass.value,
            confPassword: repeatPass.value
        });
        navigate("/");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm 
                  validated={validated}
                  onSubmit={Register}>
                  <h1>Registrate</h1>
                  <p className="text-medium-emphasis">Crea tu cuenta</p>
                  <p className="has-text-centered">{msg}</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    placeholder="Usuario" 
                    id="user" 
                    pattern="^[a-zA-Z0-9_.-]*$"
                    autoComplete="username" 
                    required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                    type="email"
                    id="email" 
                    placeholder="Email" 
                    autoComplete="email" 
                    required
                     />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="new-password"
                      id="pass" 
                      required 
                      />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repite tu constraseña"
                      autoComplete="new-password"
                      id="repeatPass" 
                      required         
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success" aria-pressed="true">Crear Cuenta</CButton>
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

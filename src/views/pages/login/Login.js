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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from "axios";
import image from "./../../../assets/images/backgroundLogin.jpg"

const Login = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  // Validate form
  const [validated, setValidated] = useState(false)
  // Event to validate form
/*   const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    // Picking data
    e.preventDefault();
    const {user, password} = e.target.elements
    console.log(user.value, password.value)

    // Formdata on JSON 
    const data = {name: user.value, password: password.value}
    const JSONdata = JSON.stringify(data)
    console.log(JSONdata)

    // Make a fetch
    fetch('http://192.168.1.128:9000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(data),
    })
    .then( (response) => {
      //console.log(response.status)
      //console.log(response)
      return response.json()
    })
    .then( (data) => {
      console.log(data)
      //console.log(data.password)
      if(data.password == "incorrect") {
        console.log("mierda")
        window.location.reload();
      }
      else
        setToken(data)
        if (!loggedIn()){
          window.location.reload();
        } else 
          fetch
        
    })
    .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    })   
  } */

  const Auth = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    // picking data
    const {user, password} = e.target.elements
    e.preventDefault();
    try {
        await axios.post('http://192.168.1.128:9000/login', {
          
            user: user.value,
            password: password.value
        });
        navigate("/dashboard");
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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={Auth}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Inicia sesión con tu cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput id="user" placeholder="Usuario" pattern="^[a-zA-Z0-9_.-]*$" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4">
                            Continuar
                          </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/EnterEmail">
                          <CButton color="link" className="px-0">
                            Olvide mi contraseña
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Registrarse</h2>
                    <p>
                      Si quieres disfrutar de todos los servicios que ofrece NombreEmpresa registrate ahora
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Registrate
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

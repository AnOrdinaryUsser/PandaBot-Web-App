import React from 'react'
import { Link } from 'react-router-dom'
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


const fetchValue = () => {
  const url = 'http://192.168.1.192:9000?value=Mesa1'
  fetch(url, {
    headers: {'Content-Type': 'application/json', 
              'Cache-Control' : 'max-age=10'},  
    mode: 'no-cors'})
  .then((response) => {
    console.log(response)
    //console.log(response['body'])
  }) 
};

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Cliente</h2>
                    <p>
                      Si quieres disfrutar de todos los servicios que ofrece NombreEmpresa registrate ahora
                    </p>
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Continuar
                      </CButton>
                  </div>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Empresa</h2>
                    <p>
                      Si quieres disfrutar de todos los servicios que ofrece NombreEmpresa registrate ahora
                    </p>
                    <Link to="/login">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Continuar
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

export default Page404

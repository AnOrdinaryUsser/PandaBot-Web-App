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
  CImage,
  CRow,
} from '@coreui/react'
import image from './background.jpg'

const Home = () => {
  return (
    <div style={{backgroundImage: `url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer  className="mb-4">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
            <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Cliente</h2>
                    <p>
                      Si estas esperando y no te decides, pulsa continuar y mira nuestra carta
                    </p>
                      <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                        Continuar
                      </CButton>
                  </div>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Empresa</h2>
                    <p>
                      Si quieres disfrutar de todos los servicios que ofrece WaiterRobot registrate ahora
                    </p>
                    <Link to="/login">
                      <CButton color="secondary" className="mt-3" active tabIndex={-1}>
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

export default Home

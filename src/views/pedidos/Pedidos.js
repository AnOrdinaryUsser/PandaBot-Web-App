import React, {useState, useEffect} from 'react'

import {
  CButton,
  CCol,
  CRow,
  CImage,
  CContainer,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilChevronRight, cilInfo } from '@coreui/icons'
const change = { react, vue }

const Carta = () => {
    const [selected, setSelected] = useState(change.react)
    
  return (
    <>
    <CContainer>
        <CRow>
            <h2 className="mb-4">Pedidos</h2>
        </CRow>
        <CRow>
            <CCol>
                <h3 className="mb-4">En curso</h3>
            </CCol>
            <CCol>
                <h3 className="mb-4">Terminado</h3>
            </CCol>
            <CCol>
                <h3 className="mb-4">Pagado</h3>
            </CCol>
        </CRow>
        <CRow>
            <CCol>
            <CCard style={{ width: '22rem' }}>
                <CCardBody>
                    <CCardTitle>Pedido mesa 1</CCardTitle>
                    <CCardText>
                    99:99  min<CButton className="float-end"><CIcon icon={cilChevronRight}/></CButton>
                    </CCardText>
                </CCardBody>
            </CCard>
            </CCol>
            <CCol>
            <CCard style={{ width: '22rem' }}>
                <CCardBody>
                    <CCardTitle>Pedido mesa 1</CCardTitle>
                    <CCardText>
                    99:99  min<CButton className="float-end"><CIcon icon={cilChevronRight}/></CButton>
                    </CCardText>
                </CCardBody>
            </CCard>
            </CCol>
            <CCol>
            <CCard style={{ width: '22rem' }}>
                <CCardBody>
                    <CCardTitle>Pedido mesa 1</CCardTitle>
                    <CCardText>
                    99:99  min<CButton className="float-end"><CIcon icon={cilChevronRight}/></CButton>
                    </CCardText>
                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
    </CContainer>
    </>
  )
}

export default Carta

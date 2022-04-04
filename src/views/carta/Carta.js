import React, {useState, useEffect} from 'react'

import {
  CButton,
  CCol,
  CRow,
  CImage,
  CContainer,
} from '@coreui/react'

import react from '../../assets/images/react.jpg'
import vue from '../../assets/images/vue.jpg'
const change = { react, vue }

const Carta = () => {
    const [selected, setSelected] = useState(change.react)
    
  return (
    <>
    <CContainer>
        <CRow>
            <CCol  xl={2}>
              <CButton className="mb-4" onClick={() => setSelected(change.vue)}> Section 1</CButton>
            </CCol>
            <CCol  xl={2}>
              <CButton className="mb-4" onClick={() => setSelected(change.react)}> Section 2</CButton> 
            </CCol>
            <CCol  xl={2}>
              <CButton className="mb-4" onClick={() => setSelected(change.react)}> Section 3</CButton> 
            </CCol>
            <CCol>
                
            </CCol>
        </CRow>
        <CRow>
            <CImage className="mb-4" src={selected} width={1000} height={600}/>
            <div className="d-grid gap-2 col-6 mx-auto">
              <CButton className="mb-4" >Add product</CButton>
            </div>
        </CRow>
        <CRow>
            <CButton>Add section</CButton>
        </CRow>
    </CContainer>
    </>
  )
}

export default Carta

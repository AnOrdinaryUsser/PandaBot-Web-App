import React from 'react'

import {
  CButton,
  CCol,
  CRow,
  CImage,
  CContainer,
  CForm,
  CFormInput
} from '@coreui/react'

import logo from '../../assets/images/react.jpg';

const Tables1 = () => {
  return (
    <>
    <CContainer fluid>
      <h2>Edit tables</h2>
      <CRow>
        <CCol xs={4}>
          <CRow>
            <CCol xs={{ span: 4 }}>
              <CButton className="mb-4">Add table</CButton>
            </CCol>
            <CCol>
              <CButton className="mb-4">Delete table</CButton>
            </CCol>
          </CRow>
          <CRow>
            <p>Number of table:</p>
            <CForm>
              <div className="mb-3">
                <CFormInput type="number" id="exampleFormControlInput1" placeholder="Number of a table"/>
              </div>
            </CForm>
          </CRow>
          <CRow>
            <p>No. of seats:</p>
            <CCol xs="auto">
              <CButton>-</CButton>
            </CCol>
            <CCol xs={2}>
              <CForm>
                <CFormInput type="number" placeholder="0"/>
              </CForm>
            </CCol>
            <CCol xs="auto">
              <CButton>+</CButton>
            </CCol>
          </CRow>
        </CCol>
        <CCol xs={8}>
        <CImage src={logo} width={1000} height={700}/>
        </CCol>
      </CRow>      
    </CContainer>
    </>
  )
}

export default Tables1

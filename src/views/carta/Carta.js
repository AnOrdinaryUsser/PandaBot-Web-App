import React, {useState, useEffect} from 'react'

import {
  CButton,
  CCol,
  CRow,
  CImage,
  CContainer,
  CTableRow,
  CTableHead,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

const Carta = () => {
    

  const addProduct = async () => {
    try {
        await axios.post('http://localhost:9000/addProduct', {
            seats: seats.value,
            positionX: result[0],
            positionY: result[1]
        });
        navigate("/map");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}
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
            <CCol  xl={2}>
              <CButton className="mb-4" onClick={() => setSelected(change.react)}> Section 3</CButton> 
            </CCol>
            <CCol  xl={2}>
              <CButton className="mb-4" onClick={() => setSelected(change.react)}> Section 3</CButton> 
            </CCol>
            <CCol>
              <CButton className="mb-4" onClick={() => setSelected(change.react)}> + </CButton>
            </CCol>
        </CRow>
        <CRow>
        <CContainer fluid>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombre del producto</CTableHeaderCell>
                <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
                <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
                <CTableHeaderCell scope="col">Alergenos</CTableHeaderCell>
                <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Ensalada</CTableDataCell>
                <CTableDataCell>Lechuga, Tomate, Atún</CTableDataCell>
                <CTableDataCell>3,90 €</CTableDataCell>
                <CTableDataCell> Pescado Tomate</CTableDataCell>
                <CTableDataCell> lechuga.jpg</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CButton className="mb-4 d-grid gap-2 col-6 mx-auto" >Add product</CButton>
          </CContainer>
        </CRow>
    </CContainer>
    </>
  )
}

export default Carta

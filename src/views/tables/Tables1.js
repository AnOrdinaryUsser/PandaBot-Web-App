import React from 'react'

import {
  CCol,
  CRow,
  CContainer,
} from '@coreui/react'

import { TableCard } from '../../components'


const Tables1 = () => {
  return (
    <>
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol className="mb-4">
          <TableCard></TableCard>
        </CCol>
        <CCol className="mb-4">
        <TableCard></TableCard>
        </CCol>
        <CCol className="mb-4">
        <TableCard></TableCard>
        </CCol>
        <CCol className="mb-4">
        <TableCard></TableCard>
        </CCol>
      </CRow>
      <CRow className="mb-4">
        <CCol className="mb-4">
        <TableCard></TableCard>
        </CCol>
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
      </CRow>
      <CRow className="mb-4">
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
      </CRow>
      <CRow className="mb-4">
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
        <CCol className="mb-4">
        </CCol>
      </CRow>
    </CContainer>
    </>
  )
}

export default Tables1

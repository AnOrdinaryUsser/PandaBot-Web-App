import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { cilArrowCircleRight } from '@coreui/icons'

const Tables1 = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  return (
    <>
    <CContainer>  
      <CRow>  
        <CCol>
          <CCard className="text-center" style={{ width: '18rem' }}>
          <CCardBody>
            <h2 class="card-title">1</h2>
            <h5 class="card-title">Table</h5>
            <div className="d-grid gap-2">
              <CButton href="#">Send <CIcon icon={cilArrowCircleRight} size="xs" />
              </CButton>
            </div>
          </CCardBody>
          </CCard>
        </CCol>
        <CCol>
        <CCard className="text-center" style={{ width: '18rem' }}>
          <CCardBody>
            <h2 class="card-title">2</h2>
            <h5 class="card-title">Table</h5>
            <div className="d-grid gap-2">
              <CButton href="#">Send <CIcon icon={cilArrowCircleRight} size="xs" />
              </CButton>
            </div>
          </CCardBody>
          </CCard>
        </CCol>
        <CCol>
        <CCard className="text-center" style={{ width: '18rem' }}>
          <CCardBody>
            <h2 class="card-title">3</h2>
            <h5 class="card-title">Table</h5>
            <div className="d-grid gap-2">
              <CButton href="#">Send <CIcon icon={cilArrowCircleRight} size="xs" />
              </CButton>
            </div>
          </CCardBody>
          </CCard>
        </CCol>
        <CCol>
        <CCard className="text-center" style={{ width: '18rem' }}>
          <CCardBody>
            <h2 class="card-title">4</h2>
            <h5 class="card-title">Table</h5>
            <div className="d-grid gap-2">
              <CButton href="#">Send <CIcon icon={cilArrowCircleRight} size="xs" />
              </CButton>
            </div>
          </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    </>
  )
}

export default Tables1

import React from 'react'
import { CButton, CCard, CCardBody} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleRight } from '@coreui/icons'

const TableCard = () => {
    return (
        <>
        <CCard className="text-center" style={{ width: '18rem' }}>
            <CCardBody>
                <h2 className="card-title">1</h2>
                <h5 className="card-title">Table</h5>
                <div className="d-grid gap-2">
                    <CButton href="#">Send <CIcon icon={cilArrowCircleRight}  />
                    </CButton>
                </div>
            </CCardBody>
        </CCard>
        </>
    )
}

export default TableCard
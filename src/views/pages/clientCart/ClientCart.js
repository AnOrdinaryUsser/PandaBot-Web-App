import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
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
  CModal,
  CModalHeader,
  CFormLabel,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CLink,
  CFormSelect,
  CNav,
  CNavGroup,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent,
  CCardTitle,
  CCard,
  CCardBody,
} from '@coreui/react'
import { 
  FishIcon, 
  EggIcon,
  CeleryIcon,
  CrustaceanIcon,
  GlutenIcon,
  LupinIcon,
  MilkIcon,
  MolluscIcon,
  MustardIcon,
  NutsIcon,
  PeanutIcon,
  SesameIcon,
  SoyaIcon,
  SulphiteIcon,
 } from 'react-allergens';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from "axios";
import prueba from "./../../../assets/images/avatars/1.jpeg"

const Login = () => {

  const [products, setProducts] = useState([]);
  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState([]);
  const [activeKey, setActiveKey] = useState(1)
  
  useEffect(() => {
      getProducts();
      getSections();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:9000/getProducts', {
    });
    setProducts(response.data);
    console.log(response.data)
  }
  const getSections = async () => {
    const response = await axios.get('http://localhost:9000/getSections', {
    });
    setSections(response.data);
    console.log(response.data)
  }

  return (
    <>
    <div style={{backgroundColor:"#605F5B"}}>
    <CContainer className='mb-4'>
      <CNav className="justify-content-center" variant='underline'>
        {sections.map((section,index) => {
        return (
        <CNavItem key={index}>
          <CNavLink 
          href="javascript:void(0);"
          active={activeKey === section.id}
          onClick={() => setActiveKey(section.id)}
          style={{color:"white"}}>
            {section.name}
          </CNavLink>
        </CNavItem>
        )})}
      </CNav>
      <CTabContent>
    
    {sections.map((section,index) => {
      return (
        <CTabPane key={section.id} role="tabpanel" visible={activeKey === section.id}>
        </CTabPane>
      )})}
    </CTabContent>
    
  </CContainer>
  </div>
    <CContainer className='justify-content-center' fluid>
    <CRow className='justify-content-center mb-4'>
    <CCard style={{ width: ' 80rem' }}>
              <CCardBody>
                  <CContainer fluid>
                    <CRow>
                      <CCol xs={3} >
                        <CImage fluid src={prueba}/>
                      </CCol>
                      <CCol xs={9}>
                        <CRow>
                        <h1>Tarta de queso</h1>
                        <p>Un pastel de queso o tarta de queso (véase otros nombres) es un postre muy popular desde el siglo XX hecho a base de ricota, requesón, queso quark, azúcar y algunas veces otros ingredientes, tales como: huevos, crema de leche o nata, harina, patata, almendras o frutas (limones o naranjas, etc.)</p>
                        </CRow>
                        <CRow>
                          <FishIcon/>
                          <MilkIcon/>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CContainer>
              </CCardBody>
          </CCard>
      </CRow>
      <CRow className='justify-content-center mb-4'>
    <CCard style={{ width: ' 80rem' }}>
              <CCardBody>
                  
              </CCardBody>
          </CCard>
      </CRow>
      <CRow className='justify-content-center mb-4'>
    <CCard  style={{ width: ' 80rem' }}>
              <CCardBody>
                 
              </CCardBody>
          </CCard>
      </CRow>
    </CContainer>
    </>
  )
}

export default Login

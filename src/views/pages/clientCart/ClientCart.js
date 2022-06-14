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
  CCardText,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
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
import axios from "axios";
import prueba from "./../../../assets/images/tarta.jpg"
import { AppHeaderClient } from "./../../../components"
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilExitToApp, cilCart, cilPlus } from '@coreui/icons'


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
      <CHeader position="sticky" className="mb-4">
      <CContainer fluid className="justify-content-center">
      
      <CNav className="justify-content-center">
        {sections.map((section,index) => {
        return (
        <CNavItem key={index}>
          <CNavLink className="nav-link active" aria-current="page" 
          href="javascript:void(0);"
          active={activeKey === 1}
          onClick={() => setActiveKey(section.id)}
          style={{color:"black"}}>
            {section.name}
          </CNavLink>
        </CNavItem>
        )})}
      </CNav>
      <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>

        <CHeaderToggler>
          <CIcon icon={cilCart} size="lg" />
        </CHeaderToggler>
      
      </CContainer>
    </CHeader>
      
      <CTabContent>
    
    {sections.map((section,index) => {
      return (
        <CTabPane key={section.id} role="tabpanel" visible={activeKey === section.id}>
          {products.filter(product => product.section == section.id).map((product,index) => {
                var allergens = JSON.parse(product.allergens)
                return (
                  <CContainer className='justify-content-center' >
                    <CRow className='justify-content-center mb-4'>
                    <CCol >
                      <CCard style={{ width: '60rem' }}>
                            <CCardBody>
                                <CContainer fluid>
                                  <CRow>
                                    <CCol xs={4} >
                                      <CImage align='center' fluid className="clearfix" src={"http://localhost:9000/public/images/" + product.img}/>
                                    </CCol>
                                    <CCol xs={8}>
                                      <CRow>
                                      <h1>{product.name}</h1>
                                      <p>{product.description}</p>
                                      </CRow>
                                      <CRow xl={{ gutter: 0 }}>
                                        {allergens.map(p => {
                                          
                                          switch (p.label) {
                                            case "Pescado":
                                              return <CCol xs={1}> <FishIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "FrutosSecos":
                                              return <CCol xs={1}> <NutsIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Lacteos":
                                              return <CCol xs={1}> <MilkIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Moluscos":
                                              return <CCol xs={1}> <MolluscIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Cereales con gluten":
                                              return <CCol xs={1}> <GlutenIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Crustáceos":
                                              return <CCol xs={1}> <CrustaceanIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Huevos":
                                              return <CCol xs={1}> <EggIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Cacahuetes":
                                              return <CCol xs={1}> <PeanutIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Soja":
                                              return <CCol xs={1}> <SoyaIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Apio":
                                              return <CCol xs={1}> <CeleryIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Mostaza":
                                              return <CCol xs={1}> <MustardIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Sésamo":
                                              return <CCol xs={1}> <SesameIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Altramuces":
                                              return <CCol xs={1}> <LupinIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Sulfitos":
                                              return <CCol xs={1}> <SulphiteIcon width="25px" height="25px"/> </CCol>
                                              break;
                                            case "Ninguno":
                                              return "Ningun alergeno"
                                              break;
                                          }
                                        })
                                        }
                                        
                                        <CCol className='text-end'>
                                          <h3>{product.price} €</h3>
                                        </CCol>
                                      </CRow>
                                    </CCol>
                                  </CRow>
                                </CContainer>
                            </CCardBody>
                        </CCard>
                        </CCol>
                        <CCol className="d-flex justify-content-center align-items-center" style={{margin:"0"}}>
                          <CButton className="justify-content-center shadow-none" style={{ width: '10rem', height: "10rem", background: "transparent", color:"transparent", borderColor:"transparent" }}>
                            <CIcon icon={cilPlus} size="3xl" style={{color:"black"}}/>
                          </CButton>               
                        </CCol>
                    </CRow>
                  </CContainer>
                )
            })}
        </CTabPane>
      )})}
    </CTabContent>
    </>
  )
}

export default Login

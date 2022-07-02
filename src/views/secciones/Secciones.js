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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilX } from '@coreui/icons'
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
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import axios from "axios";

const options = [
  { label: "Pescado", value: "pescado" },
  { label: "Frutos secos", value: "frutosSecos" },
  { label: "Lacteos", value: "lacteos" },
  { label: "Moluscos", value: "moluscos" },
  { label: "Cereales con gluten", value: "gluten" },
  { label: "Crustáceos", value: "crustaceos" },
  { label: "Huevos", value: "huevos" },
  { label: "Cacahuetes", value: "cacahuetes" },
  { label: "Soja", value: "soja" },
  { label: "Apio", value: "apio" },
  { label: "Mostaza", value: "mostaza" },
  { label: "Sésamo", value: "sesamo" },
  { label: "Altramuces", value: "altramuces" },
  { label: "Sulfitos", value: "sulfitos" },
  { label: "Ninguno", value: "ninguno" },
 
];


const Secciones = () => {
  
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState([]);
  const [validated, setValidated] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleModify, setVisibleModify] = useState(false)
  
  useEffect(() => {
      getSections();
  }, []);

  const addSection = async (e) => {
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault();
    console.log(section.value)
    try {
      await axios.post('http://192.168.1.128:9000/addSection', {
          name: sectionInput.value,
      });
      window.location.reload();
  } catch (error) {
      if (error.response) {
          setMsg(error.response.data.msg);
      }
  }
  }

  const getSection = async (sectionID) => {
    const response = await axios.post('http://192.168.1.128:9000/getSection', {
      id: sectionID,
    });
    setSection(response.data);
    console.log(response.data)
  }

  const getSections = async () => {
    const response = await axios.get('http://192.168.1.128:9000/getSections', {
    });
    setSections(response.data);
    console.log(response.data)
  }

  const deleteSection = async (e) => {
    try {
      await axios.post('http://192.168.1.128:9000/deleteSection', {
        id: e.currentTarget.id,
      });
      window.location.reload();
  } catch (error) {
      if (error.response) {
          setMsg(error.response.data.msg);
      }
  }
  }


  function handlerButton(sectionID) {
    setVisibleModify(!visibleModify);
    getSection(sectionID);
  }

  const modifySection = async (e, sectionID) => {
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault();

    try {
      await axios.post('http://192.168.1.128:9000/modifySection', {
          id: sectionID,
          name: productName.value,
      });
      window.location.reload();
  } catch (error) {
      if (error.response) {
          setMsg(error.response.data.msg);
      }
  }
  }
  
  return (
    <>
    <CContainer >
      <CRow>
        <CContainer fluid>
        <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {sections.sort((a,b) => a.id > b.id ? 1 : -1).map((section,index) => {
                  return(
                    <CTableRow key={section.id}>
                    <CTableDataCell>{section.id}</CTableDataCell>
                    <CTableDataCell>{section.name}</CTableDataCell>
                    <CTableDataCell>
                            <CButton id={section.id} style={{backgroundColor: "#3a8cbe", borderColor: "#3a8cbe", margin:"10px"}} onClick={() => handlerButton(section.id)}>Editar</CButton>
                            <CButton id={section.id} style={{backgroundColor: "#e8463a", borderColor: "#e8463a", margin:"10px"}} onClick={deleteSection}>Eliminar</CButton>
                    </CTableDataCell>
                    </CTableRow>
                 )})}
            </CTableBody>
          </CTable>
          <CButton className="mb-4 d-grid" color="secondary" style={{color:"white"}} onClick={() => setVisible(true)}>Añadir sección</CButton>
        </CContainer>
      </CRow>
    </CContainer>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Añadir sección</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CForm className="mb-4"
                  validated={validated}
                  onSubmit={addSection}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Nombre</CFormLabel>
                    <CCol sm={10} >
                      <CFormInput type="text" id="sectionInput" required/>
                    </CCol>
                  </CRow>
                  <div className="d-grid d-md-flex justify-content-end">
                    <CButton className='text-end' type="submit" color="secondary" style={{color:"white"}}>Añadir</CButton>
                  </div>
            </CForm>
            </CModalBody>
          </CModal>
    <CModal alignment="center" visible={visibleModify} onClose={() => setVisibleModify(false)}>
            <CModalHeader onClose={() => setVisibleModify(false)}>
              <CModalTitle>Modificar sección</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CForm className="mb-4"
                  validated={validated}
                  onSubmit={(e) => modifySection(e,section.id)}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Nombre</CFormLabel>
                    <CCol sm={10} >
                      <CFormInput type="text" id="productName" placeholder={section.name} pattern="^[a-zA-Z ()]*$"  title="Solo puedes introducir letras a-Z, parentesis o espacios" required/>
                    </CCol>
                  </CRow>
                  <div className="d-grid gap-2 d-md-flex justify-content-end">
                    <CButton className='text-end' type="submit" color="secondary" style={{color:"white"}}>Modificar</CButton>
                  </div>
            </CForm>
            </CModalBody>
          </CModal>
    </>
  )
}

export default Secciones

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
  CInputGroupText
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Carta = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
      getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:9000/getProducts', {
    });
    setProducts(response.data);
    console.log(response.data)
  }

  function getBase64(file, onLoadCallback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;
    reader.onerror = function(error) {
        console.log('Error when converting PDF file to base64: ', error);
    };
  }

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [msg, setMsg] = useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const addProduct = async (e) => {
    const form = e.currentTarget
    var selectFile_as_base64 = "";
     getBase64(selectedFile, function(e) {
      selectFile_as_base64 = e.target.result;
      console.log(selectFile_as_base64);
    });

    console.log("Mierda: " + selectFile_as_base64);

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    e.preventDefault();
    try {
        await axios.post('http://localhost:9000/addProduct', {headers: {
          'Content-Type': 'multipart/form-data'
        },
          name: productName.value,
          description: descp.value,
          price: price.value,
          allergens: allergens.value,
          section: "1",
          img: selectFile_as_base64
        });
        //navigate("/carta");
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

            {products.map((product,index) => {
            return (
              <CTableRow key={product.id}>
                <CTableDataCell>{product.id}</CTableDataCell>
                <CTableDataCell>{product.name}</CTableDataCell>
                <CTableDataCell>{product.description}</CTableDataCell>
                <CTableDataCell>{product.price} €</CTableDataCell>
                <CTableDataCell> {product.allergens}</CTableDataCell>
              </CTableRow>
            )
            })}
            </CTableBody>
          </CTable>
          <CButton className="mb-4 d-grid gap-2 col-6 mx-auto"  onClick={() => setVisible(!visible)}>Add product</CButton>
          <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Añadir producto</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CForm className="mb-3"
                  validated={validated}
                  onSubmit={addProduct}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Nombre</CFormLabel>
                    <CCol sm={10} >
                      <CFormInput type="text" id="productName" placeholder="Nombre del producto" required/>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Descripción</CFormLabel>
                    <CCol sm={10} >
                      <CFormInput type="text" id="descp" placeholder="Descripción" required/>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Precio</CFormLabel>
                    <CCol sm={10} >
                      <CFormInput type="text" id="price" placeholder="Precio" required/>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Alergenos</CFormLabel>
                    <CCol sm={10} >
                      <CFormInput type="text" id="allergens" placeholder="Alergenos" required/>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Foto</CFormLabel>
                    <CCol sm={10} >
                    <CFormInput type="file" id="imgFile" onChange={(e) => setSelectedFile(e.target.files[0])} required/>
                    </CCol>
                  </CRow>
                  <CButton type="submit" color="primary">Save changes</CButton>
                  <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              
            </CModalFooter>
            </CForm>
            </CModalBody>
          
          </CModal>
          </CContainer>
        </CRow>
    </CContainer>
    </>
  )
}

export default Carta

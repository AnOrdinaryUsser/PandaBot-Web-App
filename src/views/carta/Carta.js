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
  CFormSelect
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
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
 
];


const Carta = () => {
  
  const [products, setProducts] = useState([]);
  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState([]);
  
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

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState('');

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };  

  const addProduct = async (e) => {
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    e.preventDefault();


    //////////////
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    console.log(formData.get("fileName"))
    //////////////

    try {
      const res = await axios.post(
        "http://localhost:9000/uploadImg",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }



    try {
        await axios.post('http://localhost:9000/addProduct', {
          name: productName.value,
          description: descp.value,
          price: price.value,
          allergens: JSON.stringify(selected),
          img:formData.get("fileName"),
          section: section.value
        });
        navigate("/carta");
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
            {sections.map((section,index) => {
            return (
            <CCol xl={2} >
              <CButton key={section.id} className="mb-4">{section.name}</CButton>
            </CCol>
            )})}
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
                var allergens = JSON.parse(product.allergens)
            return (
              <CTableRow key={product.id}>
                <CTableDataCell>{product.id}</CTableDataCell>
                <CTableDataCell>{product.name}</CTableDataCell>
                <CTableDataCell>{product.description}</CTableDataCell>
                <CTableDataCell>{product.price} €</CTableDataCell>
                <CTableDataCell> 
                 
                  {
                    <div>
                      {allergens.map(p => {
                        return p.label + " ,"; 
                      })
                      }
                      </div>                    
                 }
                  
                  
                </CTableDataCell>
                <CLink href={"http://localhost:9000/public/images/" + product.img}>
                  <CTableDataCell> 
                    <CImage fluid className="clearfix" src={"http://localhost:9000/public/images/" + product.img} width={200} height={200}/>
                  </CTableDataCell>
                </CLink>
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
                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Seleccione los alergenos"
                      />
                      {console.log(JSON.stringify(selected))}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                  <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Sección</CFormLabel>
                    <CCol sm={10} >
                      <CFormSelect id="section" required>
                        <option>Escoja una sección</option>
                        <option>Entrantes</option>
                        <option>Platos</option>
                        <option>Postres</option>
                        <option>Refrescos</option>
                        <option>Bebidas Alcoholicas</option>
                        <option>Vinos</option>
                        <option>Cafes</option>
                      </CFormSelect> 
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">Foto</CFormLabel>
                    <CCol sm={10} >
                    <CFormInput type="file" onChange={saveFile} enctype="multipart/form-data" required/>
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

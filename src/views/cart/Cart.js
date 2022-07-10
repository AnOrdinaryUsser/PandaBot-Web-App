import React, { useState, useEffect } from "react";
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
  CModalBody,
  CForm,
  CFormInput,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent,
} from "@coreui/react";
import { MultiSelect } from "react-multi-select-component";
import {
  getProducts,
  getProduct,
  deleteProduct,
  modifyProduct,
  addProduct,
  saveFile,
} from "../../services/ProductsService.js";
import { getSections } from "../../services/SectionsService.js";
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

const Carta = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState([]);
  const [activeKey, setActiveKey] = useState(1);
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [visibleModify, setVisibleModify] = useState(false);

  useEffect(() => {
    getProducts(setProducts);
    getSections(setSections);
  }, []);

  function handlerButton(productID) {
    setVisibleModify(!visibleModify);
    getProduct(productID, setProduct);
  }

  return (
    <>
      <CContainer>
        <CNav className="justify-content-center mb-4">
          {sections.map((section, index) => {
            return (
              <CNavItem key={index}>
                <CNavLink
                  style={{ color: "black" }}
                  href="javascript:void(0);"
                  active={activeKey === section.id}
                  onClick={() => setActiveKey(section.id)}
                >
                  {section.name}
                </CNavLink>
              </CNavItem>
            );
          })}
        </CNav>
        <CTabContent>
          {sections.map((section, index) => {
            return (
              <CTabPane
                key={section.id}
                role="tabpanel"
                visible={activeKey === section.id}
              >
                <CRow>
                  <CContainer fluid>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">
                            Producto
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Descripción
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Precio
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Alergenos
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Acciones
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {products
                          .filter((product) => product.section == section.id)
                          .map((product, index) => {
                            var allergens = JSON.parse(product.allergens);
                            return (
                              <CTableRow key={product.id}>
                                <CTableDataCell>{product.name}</CTableDataCell>
                                <CTableDataCell>
                                  {product.description}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {product.price} €
                                </CTableDataCell>
                                <CTableDataCell>
                                  {
                                    <div>
                                      {allergens.map((p) => {
                                        return p.label + "  ";
                                      })}
                                    </div>
                                  }
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CImage
                                    fluid
                                    className="clearfix"
                                    src={
                                      "http://192.168.1.50:9000/public/images/" +
                                      product.img
                                    }
                                    width={200}
                                    height={200}
                                  />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CButton
                                    id={product.id}
                                    style={{
                                      backgroundColor: "#3a8cbe",
                                      borderColor: "#3a8cbe",
                                    }}
                                    onClick={() => handlerButton(product.id)}
                                  >
                                    Editar
                                  </CButton>
                                  <p></p>
                                  <CButton
                                    id={product.id}
                                    style={{
                                      backgroundColor: "#e8463a",
                                      borderColor: "#e8463a",
                                    }}
                                    onClick={deleteProduct}
                                  >
                                    Eliminar
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                            );
                          })}
                      </CTableBody>
                    </CTable>
                  </CContainer>
                </CRow>
              </CTabPane>
            );
          })}
        </CTabContent>
        <CRow>
          <CContainer fluid>
            <CButton
              className="mb-4 d-grid mx-auto"
              color="secondary"
              style={{ color: "white" }}
              onClick={() => setVisible(!visible)}
            >
              Añadir producto
            </CButton>
            <CModal
              alignment="center"
              visible={visible}
              onClose={() => setVisible(false)}
            >
              <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle>Añadir producto</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm
                  className="mb-4"
                  validated={validated}
                  onSubmit={(e) => addProduct(e,setValidated, file, fileName)}
                >
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Nombre
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="productName"
                        placeholder="Nombre del producto"
                        pattern="^[a-zA-Z ()]*$"
                        title="Solo puedes introducir letras a-Z, parentesis o espacios"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Descp.
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="descp"
                        placeholder="Descripción"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Precio
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="price"
                        placeholder="Precio"
                        pattern="[+-]?\d+(?:[.,]\d+)?"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Alergenos
                    </CFormLabel>
                    <CCol sm={10}>
                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Seleccione los alergenos"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Sección
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect id="section" required>
                        <option>Escoja una sección</option>
                        {sections.map((section, index) => {
                          return (
                            <>
                              <option>{section.name}</option>
                            </>
                          );
                        })}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Foto
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="file"
                        onChange={(e) => saveFile(e, setFile, setFileName)}
                        enctype="multipart/form-data"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CButton
                    className='className="mb-4 d-grid gap-2 col-6 mx-auto'
                    type="submit"
                    color="secondary"
                    style={{ color: "white" }}
                  >
                    Añadir
                  </CButton>
                </CForm>
              </CModalBody>
            </CModal>
            <CModal
              alignment="center"
              visible={visibleModify}
              onClose={() => setVisibleModify(false)}
            >
              <CModalHeader onClose={() => setVisibleModify(false)}>
                <CModalTitle>Modificar producto</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm
                  className="mb-4"
                  validated={validated}
                  onSubmit={(e) => modifyProduct(e, product.id, setValidated, file, fileName)}
                >
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Nombre
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="productName"
                        defaultValue={product.name}
                        pattern="^[a-zA-Z ()]*$"
                        title="Solo puedes introducir letras a-Z, parentesis o espacios"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Descp.
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="descp"
                        defaultValue={product.description}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Precio
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="price"
                        defaultValue={product.price}
                        pattern="[+-]?\d+(?:[.,]\d+)?"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Alergenos
                    </CFormLabel>
                    <CCol sm={10}>
                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Seleccione los alergenos"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Sección
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect id="section" required>
                        <option>Escoja una sección</option>
                        {sections.map((section, index) => {
                          return (
                            <>
                              <option>{section.name}</option>
                            </>
                          );
                        })}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="colFormLabel"
                      className="col-sm-2 col-form-label"
                    >
                      Foto
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="file"
                        onChange={(e) => saveFile(e, setFile, setFileName)}
                        enctype="multipart/form-data"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CButton
                    className='className="mb-4 d-grid gap-2 col-6 mx-auto'
                    type="submit"
                    color="secondary"
                    style={{ color: "white" }}
                  >
                    Modificar
                  </CButton>
                </CForm>
              </CModalBody>
            </CModal>
          </CContainer>
        </CRow>
      </CContainer>
    </>
  );
};

export default Carta;

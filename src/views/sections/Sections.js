import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  CButton,
  CCol,
  CRow,
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
} from "@coreui/react";
import {
  getSections,
  getSection,
  deleteSection,
  modifySection,
  addSection,
} from "../../services/SectionsService.js";
import { refreshToken } from "../../services/UsersService.js";

const Secciones = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState([]);
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleModify, setVisibleModify] = useState(false);

  useEffect(() => {
    refreshToken(setToken, setExpire);
    getSections(setSections);
  }, []);

  function handlerButton(sectionID) {
    setVisibleModify(!visibleModify);
    getSection(sectionID, setSection);
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://192.168.1.50:9000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <CContainer>
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
                {sections
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((section, index) => {
                    return (
                      <CTableRow key={section.id}>
                        <CTableDataCell>{section.id}</CTableDataCell>
                        <CTableDataCell>{section.name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            id={section.id}
                            style={{
                              backgroundColor: "#3a8cbe",
                              borderColor: "#3a8cbe",
                              margin: "10px",
                            }}
                            onClick={() => handlerButton(section.id)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            id={section.id}
                            style={{
                              backgroundColor: "#e8463a",
                              borderColor: "#e8463a",
                              margin: "10px",
                            }}
                            onClick={deleteSection}
                          >
                            Eliminar
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
              </CTableBody>
            </CTable>
            <CButton
              className="mb-4 d-grid"
              color="secondary"
              style={{ color: "white" }}
              onClick={() => setVisible(true)}
            >
              Añadir sección
            </CButton>
          </CContainer>
        </CRow>
      </CContainer>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Añadir sección</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="mb-4"
            validated={validated}
            onSubmit={(e) => addSection(e, setValidated)}
          >
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="colFormLabel"
                className="col-sm-2 col-form-label"
              >
                Nombre
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="sectionInput" required />
              </CCol>
            </CRow>
            <div className="d-grid d-md-flex justify-content-end">
              <CButton
                className="text-end"
                type="submit"
                color="secondary"
                style={{ color: "white" }}
              >
                Añadir
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
      <CModal
        alignment="center"
        visible={visibleModify}
        onClose={() => setVisibleModify(false)}
      >
        <CModalHeader onClose={() => setVisibleModify(false)}>
          <CModalTitle>Modificar sección</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="mb-4"
            validated={validated}
            onSubmit={(e) => modifySection(e, section.id, setValidated)}
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
                  id="sectionInputModify"
                  defaultValue={section.name}
                  pattern="^[a-zA-Z ()]*$"
                  title="Solo puedes introducir letras a-Z, parentesis o espacios"
                  required
                />
              </CCol>
            </CRow>
            <div className="d-grid gap-2 d-md-flex justify-content-end">
              <CButton
                className="text-end"
                type="submit"
                color="secondary"
                style={{ color: "white" }}
              >
                Modificar
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};

export default Secciones;

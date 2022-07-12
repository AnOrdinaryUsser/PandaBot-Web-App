import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import image from "./../../../assets/images/backgroundLogin.jpg";
import { changePassword } from "../../../services/MailService.js";

const ResetPassword = () => {
  const [validated, setValidated] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-vh-100 d-flex flex-row align-items-center"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  validated={validated}
                  onSubmit={(e) => changePassword(e, token, setValidated)}
                >
                  <h4 className="text-center mb-3">
                    Introduce tu nueva contraseña
                  </h4>
                  <CInputGroup className="align-content-center mb-3">
                    <CFormInput
                      placeholder="Contraseña"
                      id="password"
                      type="password"
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid gap-2 d-md-flex justify-content-end">
                    <CButton type="submit" color="success" aria-pressed="true">
                      Cambiar
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCol,
  CRow,
  CContainer,
  CFormInput,
  CCard,
  CCardBody,
  CCardImage,
} from "@coreui/react";
import { getCart } from "../../../services/CartService.js";

const Register = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const tableID = queryParams.get("mesa");

  const URL = "/clientCart?mesa=" + tableID;

  const [cart, setCart] = useState([]);
  let totalPrice = 0;

  useEffect(() => {
    getCart(tableID, setCart);
  }, []);

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row justify-items-center">
        <CContainer className="justify-content-center mb-4">
          <h1></h1>
          <h1 className="modal-title mb-4">
            Ticket de la mesa número: {tableID}
          </h1>
          {cart.map((product, index) => {
            totalPrice +=
              product["products.cart.qty"] * product["products.price"];
            return (
              <CRow className="justify-content-center mb-4" key={index}>
                <CCol xs={9}>
                  <CCard className="mb-3">
                    <CRow className="g-0">
                      <CCol md={4}>
                        <CCardImage
                          src={
                            "http://192.168.1.50:9000/public/images/" +
                            product["products.img"]
                          }
                        />
                      </CCol>
                      <CCol md={8}>
                        <CCardBody>
                          <h3>{product["products.name"]}</h3>
                          <h4 className="text-end">
                            {product["products.price"]} €
                          </h4>
                        </CCardBody>
                      </CCol>
                    </CRow>
                  </CCard>
                </CCol>
                <CCol xs={3} className="justify-items-content">
                  <CFormInput
                    className="text-center"
                    value={product["products.cart.qty"]}
                    disabled
                  />
                  <p></p>
                </CCol>
              </CRow>
            );
          })}
          <h3 className="mb-4">Total a pagar: {totalPrice} €</h3>
          <Link to={URL}>
            <CButton color="secondary" aria-pressed="true">
              Volver
            </CButton>
          </Link>
        </CContainer>
      </div>
    </>
  );
};

export default Register;

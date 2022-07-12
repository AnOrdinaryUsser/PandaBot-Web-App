import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCol,
  CRow,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CFormInput,
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent,
  CCard,
  CCardBody,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CCardImage,
} from "@coreui/react";
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
} from "react-allergens";
import CIcon from "@coreui/icons-react";
import { cilCart, cilPlus, cilTrash } from "@coreui/icons";
import { getOrder, addOrder } from "../../../services/OrdersService.js";
import { getProducts } from "../../../services/ProductsService.js";
import { getSections } from "../../../services/SectionsService.js";
import {
  getCart,
  addProductToCart,
  destroyProductCart,
  cancelOrder,
} from "../../../services/CartService.js";

const Login = () => {
  const [productsList, setProductsList] = useState([]);
  const [sections, setSections] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState(1);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  let totalPrice = 0;

  const queryParams = new URLSearchParams(window.location.search);
  const tableID = queryParams.get("mesa");

  const URL = "/ticket?mesa=" + tableID;

  useEffect(() => {
    getOrder(tableID, setOrder);
    getProducts(setProductsList);
    getSections(setSections);
  }, []);

  function handlerButtonCart() {
    setVisible(!visible);
    getCart(tableID, setCart);
  }

  if (order != null && order.status != "Terminado") {
    return (
      <>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={9} lg={7} xl={6}>
                <h1 className="text-center mb-3">
                  Ya se ha realizado un pedido para esta mesa
                </h1>
                <p className="text-center mb-3">
                  Si quiere realizar otro pedido, deberá eliminar el pedido
                  actual o esperar a finalizar el pedido actual
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-center mb-4">
                  <Link to={URL}>
                    <CButton color="secondary" aria-pressed="true">
                      Ver pedido
                    </CButton>
                  </Link>
                </div>
              </CCol>
            </CRow>
            <CRow className="justify-content-center">
              <CCol md={9} lg={7} xl={6}>
                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <CButton
                    color="danger"
                    aria-pressed="true"
                    onClick={() => cancelOrder(tableID)}
                  >
                    Cancelar pedido
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </>
    );
  } else {
    return (
      <>
        <CHeader position="sticky" className="mb-4">
          <CContainer fluid className="justify-content-center">
            <CNav className="justify-content-center">
              {sections.map((section, index) => {
                return (
                  <CNavItem key={index}>
                    <CNavLink
                      className="nav-link active"
                      aria-current="page"
                      href="javascript:void(0);"
                      active={activeKey === 1}
                      onClick={() => setActiveKey(section.id)}
                      style={{ color: "black" }}
                    >
                      {section.name}
                    </CNavLink>
                  </CNavItem>
                );
              })}
            </CNav>
            <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>

            <CHeaderToggler>
              <CIcon icon={cilCart} size="lg" onClick={handlerButtonCart} />
            </CHeaderToggler>
          </CContainer>
        </CHeader>

        <CTabContent>
          {sections.map((section, index) => {
            return (
              <CTabPane
                key={section.id}
                role="tabpanel"
                visible={activeKey === section.id}
              >
                {productsList
                  .filter((product) => product.section == section.id)
                  .map((product, index) => {
                    var allergens = JSON.parse(product.allergens);
                    return (
                      <CContainer
                        className="justify-content-center"
                        key={product.id}
                      >
                        <CCard className="justify-content-center mb-4">
                          <CRow className="g-0">
                            <CCol md={4}>
                              <CCardImage
                                align="center"
                                className="clearfix"
                                src={
                                  "http://192.168.1.50:9000/public/images/" +
                                  product.img
                                }
                              />
                            </CCol>
                            <CCol md={8}>
                              <CCardBody>
                                <CContainer fluid>
                                  <CRow>
                                    <CRow>
                                      <h1>{product.name}</h1>
                                      <p>{product.description}</p>
                                    </CRow>
                                    <CRow className="mb-4">
                                      {allergens.map((p) => {
                                        switch (p.label) {
                                          case "Pescado":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <FishIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "FrutosSecos":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <NutsIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Lacteos":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <MilkIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Moluscos":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <MolluscIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Cereales con gluten":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <GlutenIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Crustáceos":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <CrustaceanIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Huevos":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <EggIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Cacahuetes":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <PeanutIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Soja":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <SoyaIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Apio":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <CeleryIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Mostaza":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <MustardIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Sésamo":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <SesameIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Altramuces":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <LupinIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Sulfitos":
                                            return (
                                              <CCol xs={1}>
                                                {" "}
                                                <SulphiteIcon
                                                  width="25px"
                                                  height="25px"
                                                />{" "}
                                              </CCol>
                                            );
                                            break;
                                          case "Ninguno":
                                            return <CCol xs={1}></CCol>;
                                            break;
                                        }
                                      })}
                                      <CCol className="text-end">
                                        <h3>{product.price} €</h3>
                                      </CCol>
                                    </CRow>
                                    <CRow className="d-grid gap-2 d-md-flex justify-content-md-end">
                                      <CCol xs={12} xl={3}>
                                        <CButton
                                          onClick={(e) =>
                                            addProductToCart(
                                              e,
                                              tableID,
                                              product.id
                                            )
                                          }
                                          color="secondary"
                                        >
                                          <CIcon icon={cilPlus} /> Añadir al
                                          carrito
                                        </CButton>
                                      </CCol>
                                    </CRow>
                                  </CRow>
                                </CContainer>
                              </CCardBody>
                            </CCol>
                          </CRow>
                        </CCard>
                      </CContainer>
                    );
                  })}
              </CTabPane>
            );
          })}
        </CTabContent>
        <CModal
          size="xl"
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Carrito</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CContainer className="justify-content-center">
              {cart.map((product, index) => {
                totalPrice +=
                  product["products.cart.qty"] * product["products.price"];
                return (
                  <CRow className="justify-content-center" key={index}>
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
                      />
                      <p></p>
                      <CButton
                        className="float-end shadow-none"
                        style={{
                          color: "white",
                          border: "none",
                          boxShadow: "white",
                          background: "white",
                          boxShadowColor: "white",
                        }}
                        onClick={(e) =>
                          destroyProductCart(
                            e,
                            tableID,
                            product["products.cart.productId"]
                          )
                        }
                      >
                        <CIcon
                          style={{ color: "red" }}
                          icon={cilTrash}
                          size="xl"
                        />
                      </CButton>
                    </CCol>
                  </CRow>
                );
              })}
            </CContainer>
            <CModalFooter>
              <h3>{totalPrice} €</h3>
              <CButton
                color="success"
                onClick={(e) => addOrder(e, totalPrice, tableID)}
              >
                Pedir
              </CButton>
            </CModalFooter>
          </CModalBody>
        </CModal>
      </>
    );
  }
};

export default Login;

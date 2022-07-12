import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  CButton,
  CCol,
  CRow,
  CContainer,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTableRow,
  CTableHead,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilChevronRight } from "@coreui/icons";
import { getOrders, statusOrder } from "../../services/OrdersService.js";
import { getCart } from "../../services/CartService.js";
import { refreshToken } from "../../services/UsersService.js";

const Carta = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    refreshToken(setToken, setExpire);
    getOrders(setOrders);
  }, []);

  function handlerButton(tableID) {
    setVisible(!visible);
    getCart(tableID, setCart);
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
          <h2 className="mb-4">Pedidos</h2>
        </CRow>
        <CRow>
          <CCol>
            <h3 className="mb-4">En curso</h3>
            {orders
              .filter((orders) => orders.status == "En curso")
              .map((order, index) => {
                return (
                  <CCard
                    key={index}
                    style={{ width: "22rem" }}
                    className="mb-4"
                  >
                    <CCardBody>
                      <CCardTitle>Pedido de mesa: {order.tableId}</CCardTitle>
                      <CCardText>
                        Total a pagar: {order.price}
                        <CButton
                          color="secondary"
                          className="float-end"
                          id="En curso"
                          onClick={() => statusOrder(order.id)}
                        >
                          <CIcon
                            style={{ color: "white" }}
                            icon={cilChevronRight}
                          />
                        </CButton>
                      </CCardText>
                      <CCardText onClick={() => handlerButton(order.tableId)}>
                        Ticket
                      </CCardText>
                    </CCardBody>
                  </CCard>
                );
              })}
          </CCol>
          <CCol>
            <h3 className="mb-4">Enviado</h3>
            {orders
              .filter((orders) => orders.status == "Enviado")
              .map((order, index) => {
                return (
                  <CCard
                    key={index}
                    style={{ width: "22rem" }}
                    className="mb-4"
                  >
                    <CCardBody>
                      <CCardTitle>Pedido de mesa: {order.tableId}</CCardTitle>
                      <CCardText>
                        Total a pagar: {order.price}
                        <CButton
                          color="secondary"
                          className="float-end"
                          id="Enviado"
                          onClick={() => statusOrder(order.id)}
                        >
                          <CIcon
                            style={{ color: "white" }}
                            icon={cilChevronRight}
                          />
                        </CButton>
                      </CCardText>
                      <CCardText onClick={() => handlerButton(order.tableId)}>
                        Ticket
                      </CCardText>
                    </CCardBody>
                  </CCard>
                );
              })}
          </CCol>
          <CCol>
            <h3 className="mb-4">Pagado</h3>
            {orders
              .filter((orders) => orders.status == "Pagado")
              .map((order, index) => {
                return (
                  <CCard
                    key={index}
                    style={{ width: "22rem" }}
                    className="mb-4"
                  >
                    <CCardBody>
                      <CCardTitle>Pedido de mesa: {order.tableId}</CCardTitle>
                      <CCardText>
                        Total a pagar: {order.price}
                        <CButton
                          color="secondary"
                          className="float-end"
                          id="Pagado"
                          onClick={() => statusOrder(order.id)}
                        >
                          <CIcon
                            style={{ color: "white" }}
                            icon={cilChevronRight}
                          />
                        </CButton>
                      </CCardText>
                      <CCardText onClick={() => handlerButton(order.tableId)}>
                        Ticket
                      </CCardText>
                    </CCardBody>
                  </CCard>
                );
              })}
          </CCol>
        </CRow>
      </CContainer>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Ticket</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cant.</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {cart.map((product, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{product["products.name"]}</CTableDataCell>
                    <CTableDataCell>
                      {product["products.cart.qty"]}
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>
        </CModalBody>
      </CModal>
    </>
  );
};

export default Carta;

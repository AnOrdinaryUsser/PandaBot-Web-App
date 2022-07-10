import React, { useState, useEffect } from "react";
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

const Carta = () => {
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getOrders(setOrders);
  }, []);

  function handlerButton(tableID) {
    setVisible(!visible);
    getCart(tableID, setCart);
  }

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

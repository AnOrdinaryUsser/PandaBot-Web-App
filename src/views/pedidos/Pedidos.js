import React, {useState, useEffect} from 'react'

import {
  CButton,
  CCol,
  CRow,
  CImage,
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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilChevronRight, cilInfo } from '@coreui/icons'
import axios from "axios";

const Carta = () => {
    
    const [visible, setVisible] = useState(false)
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    function handlerButton(tableID) {
        setVisible(!visible);
        getCart(tableID);
    }

    const getOrders = async () => {
        const response = await axios.get('http://localhost:9000/getOrders', {
        });
        setOrders(response.data);
        console.log(response.data)
    }

    const getCart = async (tableID) => {
        const response = await axios.get('http://localhost:9000/getCart?mesa='+tableID, {
        });
        setCart(response.data);
        console.log(response.data)
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
            {orders.map((order,index) => {
                return(
                    <CCard key={index} style={{ width: '22rem' }} className="mb-4">
                        <CCardBody>
                            <CCardTitle>Pedido de mesa: {order.tableId}</CCardTitle>
                            <CCardText>
                            Total a pagar: {order.price}
                            <CButton className="float-end"><CIcon icon={cilChevronRight}/></CButton>
                            </CCardText>
                            <CCardText onClick={() => handlerButton(order.tableId)}>Ticket</CCardText>
                        </CCardBody>
                    </CCard>
              )
            })}
            </CCol>
            <CCol>
            <h3 className="mb-4">Enviado</h3>
            {orders.map((order,index) => {
                return(
                    <CCard key={index} style={{ width: '22rem' }} className="mb-4">
                        <CCardBody>
                            <CCardTitle>Pedido de mesa: {order.tableId}</CCardTitle>
                            <CCardText>
                            Total a pagar: {order.price}
                            <CButton className="float-end"><CIcon icon={cilChevronRight}/></CButton>
                            </CCardText>
                            <CCardText onClick={() => handlerButton(order.tableId)}>Ticket</CCardText>
                        </CCardBody>
                    </CCard>
              )
            })}
            </CCol>
            <CCol>
            <h3 className="mb-4">Pagado</h3>
            {orders.map((order,index) => {
                return(
                    <CCard key={index} style={{ width: '22rem' }} className="mb-4">
                        <CCardBody>
                            <CCardTitle>Pedido de mesa: {order.tableId}</CCardTitle>
                            <CCardText>
                            Total a pagar: {order.price}
                            <CButton className="float-end"><CIcon icon={cilChevronRight}/></CButton>
                            </CCardText>
                            <CCardText onClick={() => handlerButton(order.tableId)}>Ticket</CCardText>
                        </CCardBody>
                    </CCard>
              )
            })}
            </CCol>
        </CRow>
    </CContainer>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
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
            {cart.map((product,index) => {
                return(
                    <CTableRow key={index}>
                    <CTableDataCell>{product["products.name"]}</CTableDataCell>
                    <CTableDataCell>{product["products.cart.qty"]}</CTableDataCell>
                    </CTableRow>
                )
            })}
               
            </CTableBody>
        </CTable>
        </CModalBody>
    </CModal>
    </>
  )
}

export default Carta

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CFormInput,
    CFormOuput,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CContainer,
    CFormSelect,
    CFormCheck,
    CModal,
    CModalHeader,
    CFormLabel,
    CModalTitle,
    CModalFooter,
    CModalBody,
    CForm,
    CInputGroup,
    CInputGroupText,
  } from "@coreui/react";
  import CIcon from '@coreui/icons-react'

import { cilLockLocked, cilUser } from '@coreui/icons'

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const [visibility, setVisibility] = useState(true)
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false)
  const [visible, setVisible] = useState(false)


  const [show, setShow] = useState(true);
  const [edit, setEdit] = useState(false);

  const buttonHandler = () => {
    setVisibility(!visibility);
    setShow(!show);
    setEdit(!edit);
    console.log(show);
  };

 

  useEffect(() => {
      refreshToken();
      getUsers();
  }, []);

  const refreshToken = async () => {
      try {
          const response = await axios.get('http://192.168.1.50:9000/token');
          setToken(response.data.accessToken);
          console.log(response)
          const decoded = jwt_decode(response.data.accessToken);
          setId(decoded.id);
          setName(decoded.name);
          setEmail(decoded.email);
          setExpire(decoded.exp);
      } catch (error) {
          if (error.response) {
              navigate("/");
          }
      }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get('http://192.168.1.50:9000/token');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setExpire(decoded.exp);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get('http://192.168.1.50:9000/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setUsers(response.data);
    }
    
    const deleteUser = async (e) => {
        try {
          await axios.post('http://192.168.1.50:9000/deleteUser', {
            id: e.currentTarget.id,
          });
          window.location.reload();
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          }
      }
      }

      const Register = async (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
          e.preventDefault()
          e.stopPropagation()
        }
        setValidated(true)
    
        e.preventDefault();
        try {
            await axios.post('http://192.168.1.50:9000/users', {
                name: user.value,
                email: email.value,
                password: pass.value,
                confPassword: repeatPass.value
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }



  return (
    <>
    <h1 className='mb-4'>Usuarios: </h1>
        <CContainer fluid>
        <CTable>
            <CTableHead>
                <CTableRow>
                <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {users.map((user,index) => {
                return(
                    <CTableRow key={index}>
                    <CTableDataCell>{user.id}</CTableDataCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>
                        <CButton id={user.id} style={{backgroundColor: "#e8463a", borderColor: "#e8463a", margin:"10px"}} onClick={deleteUser}>Eliminar</CButton>
                    </CTableDataCell>
                    </CTableRow>
                )})}
            </CTableBody>
        </CTable>
        <CButton className="mb-4 d-grid" color="secondary" style={{color:"white"}} onClick={() => setVisible(true)}>Añadir usuario</CButton>
    </CContainer>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Añadir usuario</CModalTitle>
            </CModalHeader>
            <CModalBody>
    <CForm 
                  validated={validated}
                  onSubmit={Register}>
                  <p className="text-medium-emphasis">Crea tu cuenta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    placeholder="Usuario" 
                    id="user" 
                    pattern="^[a-zA-Z0-9_.-]*$"
                    autoComplete="username" 
                    required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                    type="email"
                    id="email" 
                    placeholder="Email" 
                    autoComplete="email" 
                    required
                     />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="new-password"
                      id="pass" 
                      required 
                      />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repite tu constraseña"
                      autoComplete="new-password"
                      id="repeatPass" 
                      required         
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success" aria-pressed="true">Crear Cuenta</CButton>
                  </div>
                </CForm>
                </CModalBody>
          </CModal>
    </>
  )
}

export default AdminDashboard

import React, { useState, useEffect } from 'react'

import {
  CCol,
  CRow,
  CContainer,
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleRight, cilQrCode, cilVerticalAlignBottom, cilTrash } from '@coreui/icons'
import axios from 'axios';
import {QRCodeSVG} from 'qrcode.react';

const Tables1 = () => {

  const [tables, setTables] = useState([]);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
      getTables();
  }, []);

  const getTables = async () => {
    const response = await axios.get('http://192.168.1.128:9000/getTables', {
    });
    setTables(response.data);
    console.log(response.data)
  }

  const deleteTable = async (e) => {
    try {
      await axios.post('http://192.168.1.128:9000/deleteTable', {
        id: e.currentTarget.id,
      });
      window.location.reload();
  } catch (error) {
      if (error.response) {
          setMsg(error.response.data.msg);
      }
  }
  }

  var newURL = "ws://" + "192.168.1.193" + ":9090";
  var ros = new ROSLIB.Ros({
    url : newURL
  });

  function sendLocation(out_message){
    var outputTopic = new ROSLIB.Topic({
      ros : ros,
      name : '/recognizer/output',
      messageType : 'std_msgs/String'
    });

    var out_string = new ROSLIB.Message({});
    out_string.data = out_message;
    outputTopic.publish(out_string);
    console.log('output publisher: ' + out_string.data);
  } // end sendLocation */

  const downloadQRCode = (e, id) => {
    e.stopPropagation();
    console.log(id)
    const svg = document.getElementById("qr"+id)
    console.log(svg)
    if(svg == null)
      return
    const svgXML = new XMLSerializer().serializeToString(svg);
    const dataUrl = "data:image/svg," + encodeURIComponent(svgXML);
    console.log(dataUrl)

    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = "Mesa " + id + ".svg";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  return (
    <>
    <CContainer>
      <CRow className="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
        <CButton className='col-auto' onClick={() => setVisible(!visible)}>
          <CIcon icon={cilQrCode} size="xl" />
        </CButton>
      </CRow>
      <CRow className="mb-4" xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 2 }} xl={{ cols: 4 }}>
        {tables.map((table,index) => {
          return (<CCol key={table.id} className="mb-4">
          <CCard  className="text-center" style={{ width: '18rem' }}>
              <CCardBody>
                <CIcon className="float-end" style={{color:"red"}} icon={cilTrash}  id={table.id} onClick={deleteTable}/><p></p>
                  <h2 className="card-title">{table.id}</h2>
                  <h5 className="card-title">Mesa</h5>
                  <div className="d-grid gap-2">
                      <CButton onClick={() => sendLocation('{\'x\' : ' + table.positionX +  ', \'y\' : ' + table.positionY + '}')}>Enviar <CIcon icon={cilArrowCircleRight}  />
                      </CButton>
                  </div>
              </CCardBody>
          </CCard>
          </CCol>)
        })}
      </CRow>
    </CContainer>
    <CModal size="xl" alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>QR's de las mesas</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CContainer>
                <CRow className="mb-4" xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 2 }} xl={{ cols: 4 }}>
                  {tables.map((table,index) => {
                    return (<CCol key={table.id} className="mb-4">
                    <CCard  className="text-center" style={{ width: '14rem' }}>
                        <CCardBody>
                            <QRCodeSVG id={"qr"+table.id} className='mb-4' value={table.qrURL}/>
                                <CButton onClick={(e) => downloadQRCode(e,table.id)}><CIcon size="xs" icon={cilVerticalAlignBottom}/> Descargar
                                </CButton>
                        </CCardBody>
                    </CCard>
                    </CCol>)
                  })}
                </CRow>
              </CContainer>
            </CModalBody>
          </CModal>
    </>
  )
}

export default Tables1
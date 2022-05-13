import React, { useState, useEffect } from 'react'

import {
  CCol,
  CRow,
  CContainer,
  CButton,
  CCard,
  CCardBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleRight } from '@coreui/icons'
import { TableCard } from '../../components'
import axios from 'axios';

const Tables1 = () => {

  const [tables, setTables] = useState([]);

  useEffect(() => {
      getTables();
  }, []);

  const getTables = async () => {
    const response = await axios.get('http://localhost:9000/getTables', {
    });
    setTables(response.data);
    console.log(response.data)
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

  return (
    <>
    <CContainer fluid>
      <CRow className="mb-4" xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 2 }} xl={{ cols: 4 }}>
        {tables.map((table,index) => {
          return (<CCol key={table.id} className="mb-4">
          <CCard  className="text-center" style={{ width: '18rem' }}>
              <CCardBody>
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
    </>
  )
}

export default Tables1
import React, { useState } from 'react'

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


const Tables1 = () => {

  const [tableID, setTableID] = useState("");
  const [tablesList, setTablesList] = useState([]);
  const handleChangeID = event => {
    setTableID(event.target.value);
  };
  const handleClick = event => {
    setTablesList([...tablesList, { tableID: tableID }]);
  };

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
  } // end sendLocation

  return (
    <>
    <CContainer fluid>
      <CRow className="mb-4" xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 2 }} xl={{ cols: 4 }}>
        {tablesList.map((e,i) => {
          var value = i + 1
          return (<CCol key={e} className="mb-4">
          <CCard  className="text-center" style={{ width: '18rem' }}>
              <CCardBody>
                  <h2 className="card-title">{value}</h2>
                  <h5 className="card-title">Table</h5>
                  <div className="d-grid gap-2">
                      <CButton onClick={sendLocation(value+"")}>Send <CIcon icon={cilArrowCircleRight}  />
                      </CButton>
                  </div>
              </CCardBody>
          </CCard>
          </CCol>)
        })}
      </CRow>
    </CContainer>
    <CButton onClick={handleClick}>Add Table</CButton>
    </>
  )
}

export default Tables1

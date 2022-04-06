import React, {useState, useEffect} from 'react'

import {
  CButton,
  CCol,
  CRow,
  CImage,
  CContainer,
  CForm,
  CFormInput
} from '@coreui/react'

import logo from '../../assets/images/react.jpg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function init() {
  // Connect to ROS.
   var ros = new ROSLIB.Ros({
     url : 'ws://192.168.1.193:9090'
    });

   // Create the main viewer.
   var viewer = new ROS2D.Viewer({
     divID : 'map',
     width : 600,
     height : 500
   });

   // Setup the map client.
   var gridClient = new ROS2D.OccupancyGridClient({
     ros : ros,
     rootObject : viewer.scene
   });
   // Scale the canvas to fit to the map
   gridClient.on('change', function() {
    viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    displayPoseMarker();
  });
 }

 
const Tables1 = () => {
  useEffect(() => {
    init();
  }, []);
  return (
    <>
    
    <CContainer fluid>
      <h2>Edit tables</h2>
      <CRow>
        <CCol xs={4}>
          <CRow>
            <CCol xs={{ span: 4 }}>
              <CButton className="mb-4">Add table</CButton>
            </CCol>
            <CCol>
              <CButton className="mb-4">Delete table</CButton>
            </CCol>
          </CRow>
          <CRow>
            <p>Number of table:</p>
            <CForm>
              <div className="mb-3">
                <CFormInput type="number" id="exampleFormControlInput1" placeholder="Number of a table"/>
              </div>
            </CForm>
          </CRow>
          <CRow>
            <p>No. of seats:</p>
            <CCol xs="auto">
              <CButton>-</CButton>
            </CCol>
            <CCol xs={2}>
              <CForm>
                <CFormInput type="number" placeholder="0"/>
              </CForm>
            </CCol>
            <CCol xs="auto">
              <CButton>+</CButton>
            </CCol>
          </CRow>
        </CCol>
        <CCol xs={8}>
          <div id="map" width="640" Height="480"></div>         
        </CCol>
      </CRow>      
    </CContainer>
    </>
  )
}

export default Tables1

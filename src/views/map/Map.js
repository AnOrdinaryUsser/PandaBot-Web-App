import React, {useState, useEffect, Component} from 'react'

import {
  CButton,
  CCol,
  CRow,
  CImage,
  CContainer,
  CForm,
  CFormInput
} from '@coreui/react'

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

  // Setup the nav client
  var nav = NAV2D.OccupancyGridClientNav({
    ros : ros,
    rootObject : viewer.scene,
    viewer : viewer,
    serverName : '/move_base'
  });

  function displayPoseMarker() {

    // Create a marker representing the robot.

            var robotMarker = new ROS2D.NavigationArrow({

              size : 12,

              strokeSize : 1,

              fillColor : createjs.Graphics.getRGB(255, 128, 0, 0.66),

              pulse : true

            });

            robotMarker.visible = false;

            console.log('creating robotMarkr: ');



    // Add the marker to the 2D scene.

            gridClient.rootObject.addChild(robotMarker);

            var initScaleSet = false;



    // Subscribe to the robot's pose updates.

            var poseListener = new ROSLIB.Topic({

              ros : ros,

              name : '/robot_pose',

              messageType : 'geometry_msgs/Pose',

              throttle_rate : 100

            });



            poseListener.subscribe(function(pose) {



    // Orientate the marker based on the robot's pose.

              console.log('Got Pose data:', pose.position.x, pose.position.y );  

              robotMarker.x = pose.position.x;

              robotMarker.y = -pose.position.y;

              console.log('Pose updated: ', robotMarker.x);

              if (!initScaleSet) {

                robotMarker.scaleX = 1.0 / viewer.scene.scaleX;

                robotMarker.scaleY = 1.0 / viewer.scene.scaleY;

                initScaleSet = true;

              }

              robotMarker.rotation = viewer.scene.rosQuaternionToGlobalTheta(pose.orientation);

              robotMarker.visible = true;

            });

        } // end display pose marker
 } 

const Map = () => {
  return (
    <>
    <CContainer fluid>
      <h2>Edit tables</h2>
      <CRow>
        <CCol xs={4}>
          <CRow>
            <CCol xs={{ span: 4 }}>
              <div>
              <CButton className="mb-4">Add table</CButton>
            </div>
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
          <div id="map" width="640" height="480"></div>   
          {/* <div id="myCanvas" width="640" height="480"></div>  */}
        </CCol>
      </CRow>      
    </CContainer>
    </>
  )
}

export default Map

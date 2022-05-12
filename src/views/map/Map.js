import React, { useState, useEffect, Component } from "react";

import {
  CButton,
  CCol,
  CRow,
  CImage,
  CContainer,
  CForm,
  CFormInput,
} from "@coreui/react";

import { useNavigate } from 'react-router-dom';
import axios from "axios";

function init() {
  // Connect to ROS.
  var ros = new ROSLIB.Ros({
    url: "ws://192.168.1.193:9090",
  });

  // Create the main viewer.
  var viewer = new ROS2D.Viewer({
    divID: "map",
    width: 600,
    height: 500,
  });

  // Setup the map client.
  var gridClient = new ROS2D.OccupancyGridClient({
    ros: ros,
    rootObject: viewer.scene,
  });
  // Scale the canvas to fit to the map
  gridClient.on("change", function () {
    viewer.scaleToDimensions(
      gridClient.currentGrid.width,
      gridClient.currentGrid.height
    );
    viewer.shift(
      gridClient.currentGrid.pose.position.x,
      gridClient.currentGrid.pose.position.y
    );
    displayPoseMarker();
  });

  // Setup the nav client
  var nav = NAV2D.OccupancyGridClientNav({
    ros: ros,
    rootObject: viewer.scene,
    viewer: viewer,
    serverName: "/move_base",
  });

  function displayPoseMarker() {
    // Create a marker representing the robot.
    var robotMarker = new ROS2D.NavigationArrow({
      size: 12,
      strokeSize: 1,
      fillColor: createjs.Graphics.getRGB(255, 128, 0, 0.66),
      pulse: true,
    });
    robotMarker.visible = false;
    //console.log("creating robotMarkr: ");

    // Add the marker to the 2D scene.
    gridClient.rootObject.addChild(robotMarker);
    var initScaleSet = false;

    // Subscribe to the robot's pose updates.

    var poseListener = new ROSLIB.Topic({
      ros: ros,
      name: "/robot_pose",
      messageType: "geometry_msgs/Pose",
      throttle_rate: 100,
    });

    poseListener.subscribe(function (pose) {
      // Orientate the marker based on the robot's pose.
      //console.log("Pose data:", pose.position.x, pose.position.y);
      robotMarker.x = pose.position.x;
      robotMarker.y = -pose.position.y;
      if (!initScaleSet) {
        robotMarker.scaleX = 1.0 / viewer.scene.scaleX;
        robotMarker.scaleY = 1.0 / viewer.scene.scaleY;
        initScaleSet = true;
      }
      robotMarker.rotation = viewer.scene.rosQuaternionToGlobalTheta(
        pose.orientation
      );
      robotMarker.visible = false;
    });
  } // end display pose marker
}

 

const Map = () => {

  const [position, setPosition] = useState([]);

  useEffect(() => {
      getPosition();
  }, []);

  const getPosition = async () => {
    const response = await axios.get('http://192.168.1.193:10000/getPosition', {
    });
    console.log(response.data)
    //setPosition(response.data);
  }

  const [validated, setValidated] = useState(false)
  const addTable = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault();
    try {
        await axios.post('http://localhost:10000/addTable', {
            id: id.value,
            seats: seats.value,
            positionX: position.posX,
            positionY: position.posY
        });
        navigate("/map");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}

  useEffect(() => {
    init();
  }, []);
  
  return (
    <>
      <CContainer fluid>
        <h2 className="mb-4">Añade una mesa</h2>
        <CForm
        validated={validated}
        onSubmit={addTable}>
        <CRow>
          <CCol xs={4}>
            <CRow>
              <p>Numero de mesa:</p>
              
                <div className="mb-3">
                  <CFormInput
                    type="number"
                    id="id"
                    placeholder="Numero de mesa"
                    min={0}
                    required
                  />
                </div>
            </CRow>
            <CRow>
              <p>No. de sitios:</p>
              <CCol xs="auto">
                <CButton>-</CButton>
              </CCol>
              <CCol xs={3}>
                  <CFormInput type="number" id="seats" placeholder="" min={1} required/>
              </CCol>
              <CCol xs="auto">
                <CButton className="mb-4">+</CButton>
              </CCol>
            </CRow>
            <CRow className="mb-4">
              <CCol xs={{ span: 4 }}>
                <div>
                  <CButton type="submit" className="mb-4">Añadir mesa</CButton>
                </div>
              </CCol>
            </CRow>
          </CCol>
          <CCol xs={8}>
            <div id="map" width="640" height="480"></div>
            {/* <div id="myCanvas" width="640" height="480"></div>  */}
          </CCol>
        </CRow>
        </CForm>
      </CContainer>
    </>
  );
};

export default Map;

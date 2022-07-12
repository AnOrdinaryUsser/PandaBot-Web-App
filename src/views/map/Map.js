import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  CButton,
  CCol,
  CRow,
  CContainer,
  CForm,
  CFormInput,
} from "@coreui/react";
import { addTable } from "../../services/TablesService.js";
import { refreshToken } from "../../services/UsersService.js";

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
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    refreshToken(setToken, setExpire);
    init();
  }, []);

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
      <CContainer fluid>
        <h2 className="mb-4">Añade una mesa</h2>
        <CForm
          validated={validated}
          onSubmit={(e) => addTable(e, setValidated)}
        >
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
                <p>Nº. de sitios:</p>
                <CCol xs="auto">
                  <CButton className="mb-4" color="dark" id="-">
                    -
                  </CButton>
                </CCol>
                <CCol xs={3}>
                  <CFormInput
                    className="text-center"
                    id="seats"
                    placeholder="-"
                    min={1}
                    pattern="[0-9]*"
                    required
                  />
                </CCol>
                <CCol xs="auto">
                  <CButton className="mb-4" color="dark" id="+">
                    +
                  </CButton>
                </CCol>
              </CRow>
              <CRow className="mb-4">
                <CCol xs={{ span: 4 }}>
                  <div>
                    <CButton
                      type="submit"
                      style={{
                        backgroundColor: "#3a8cbe",
                        borderColor: "#3a8cbe",
                      }}
                      className="mb-4"
                    >
                      Añadir mesa
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol xs={8}>
              <div id="map" width="640" height="480"></div>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </>
  );
};

export default Map;

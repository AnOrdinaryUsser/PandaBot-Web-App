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

/*  function init() {
  // Create ROS node and connect to it
  const ros = new ROSLIB.Ros({
    url: 'ws://192.168.1.193:9090'
  });

  // Make robot pose subscriber
  const robotPose = new ROSLIB.Topic({
    ros : ros,
    name : '/robot_pose',
    messageType : 'geometry_msgs/Pose'
  });

  // Create an EaselJS stage from the canvas
  const canvas = document.getElementById("myCanvas");
  const stage = new createjs.Stage('myCanvas');

  // Create Map Image
  const map = new Image();
  map.src = 'taller.jpg';

  // Once map image has loaded...
  map.onload = function(event) {
    // Render Map to canvas after scaling the map and canvas to the appropriate proportions.
    const mapImage = event.target;
    const bitMap = new createjs.Bitmap(mapImage);
    bitMap.scaleX = 500 / canvas.width;
    bitMap.scaleY = 500 / canvas.height;
    canvas.width = 500;
    canvas.height = 500;
    stage.addChild(bitMap);
    stage.update()

    // Create bot image
    const botImg = new Image();
    botImg.src = 'images/yourBotImage.png';

    // Once bot image has loaded...
    botImg.onload = function(event) {
      // Create new Easel bitmap from bot image
      const botImage = event.target;
      const botBitmap = new createjs.Bitmap(botImage);

      // Create a hit box for the new image (This allows Easel to register image click events)
      const hitArea = new createjs.Shape();
      hitArea.graphics.f('#000').dr(0, 0, botBitmap.image.width, botBitmap.image.height);
      botBitmap.hitArea = hitArea;

      // Add 'Click' event listener to bot image
      botBitmap.addEventListener('click', () => {
        console.log('Bot clicked');
      });

      // Set bot img dimensions 
      // Shift image registration point from top left corner to center of image.
      // This helps with alignment and rotates image around center rather than top left corner.
      const botImgSize = 30;
      botBitmap.scaleX = botImgSize / 193;
      botBitmap.scaleY = botImgSize / 280;
      botBitmap.regX = 193 / 2;
      botBitmap.regY = 280 / 2;
      // The numbers 193 and 280 come from the original dimensions of the bot image (in this case the dimensions are 193x280)

      // Target map resolution and bot origin point.
      const resolution = 0.05;
      const originX = Math.abs(-109.2);
      const originY = Math.abs(-35.35);
      // Why the absolute value?
      // Because the origin point of the bot is based upon where the bottom left corner pixel is relative to the robot's reference to (0, 0). (Kinda confusing)

      // Calculate robot's starting point

      // Adjust canvas starting position from (0, 0) being top left corner (html canvas standard) to the bottom left corner (image standard).
      // This will align canvas and map references to the same grid points.
      // Since X = 0 is still the farthest left side, we only need to shift the Y value.
      const yZeroShift = canvas.height;

      // Calculate which pixel (a.k.a. cell) to place the robot image in the canvas.
      // To get the pixel from the robot's position data, we start by dividing the robot's pose by the map's resolution.
      // As found here, http://answers.ros.org/question/205521/robot-coordinates-in-map/
      // Calculation: originX / resolution

      // The pixel calculated will be based upon the original dimensions of the map.
      // To calculate the pixel based upon the current canvas dimensions, divide the robot pose (as previously calculated) by the ratio the map was scaled.
      // Calculation: (originX / xScaleFactor) / resolution
      // You can get the ratio by dividing the original map width/height by the respective new canvas width/height.
      const xScaleFactor = canvas.width / 500;
      const yScaleFactor = canvas.height / 500;

      // Finally, incorporate the (0, 0) shift (this aligns the starting points of the canvas and image)
      const xOriginCell = (originX / xScaleFactor) / resolution;
      const yOriginCell = yZeroShift - ((originY / yScaleFactor) / resolution);

      // Add bot image to canvas
      stage.addChild(botBitmap).set({x: xOriginCell, y: yOriginCell});
      stage.update();

      // Now that the bot is rendered at the appropriate starting point, lets start monitoring pose changes

      // Subscribe to robot pose topic
      robotPose.subscribe(pose => {
        // Remove current bot image (this prevents image trailing)
        stage.removeChild(botBitmap);

        // Target the robot's pose
        const poseX = pose.position.x;
        const poseY = pose.position.y;

        // Use three.js to convert orientation Quaternion value to Euler value.
        const quaternion = new THREE.Quaternion(
          pose.orientation.x,
          pose.orientation.y,
          pose.orientation.z,
          pose.orientation.w
        );
        const rotation = new THREE.Euler().setFromQuaternion( quaternion, "XYZ" );

        // Rotate bot image
        // Bit map rotation is measured in degrees, but our Euler value is in radians so be sure to convert BEFORE setting rotation
        botBitmap.rotation = radians_to_degrees(rotation.z);

        // Calculate the new position
        // Using the same equation as above, we can simply add the robot's pose to the original pose position, 
        // before dividing by map-canvas-ratio, to get the new cell.
        const xCell = ((originX + poseX) / xScaleFactor) / resolution;
        const yCell = yZeroShift - (((originY + poseY) / yScaleFactor) / resolution);

        // Add bot image back to canvas in new location and update the stage
        stage.addChild(botBitmap).set({x: xCell, y: yCell});
        stage.update();
      });
    };
  };

  function radians_to_degrees(radians) {
    const pi = Math.PI;
    return radians * (180/pi);
  }

 // Handle Canvas Click Events (for clicks outside of the robot images)
 canvas.addEventListener('click', (e) => onClick(e, xCell, yCell), false);
 function onClick(event, x, y) {
   console.log(getCursorPosition(event));
 }

  // Function for getting cursor position from canvas click
  function getCursorPosition(event) {
    
     if(event.pageX != undefined && event.pageY != undefined) {
       const x = event.pageX;
       const y = event.pageY;
     } else {
       x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
       y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
     };
     x -= canvas.offsetLeft;
     y -= canvas.offsetTop;
     return [x, y];
   }
} */
 
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
          <div id="map" width="640" height="480"></div>   
          {/* <div id="myCanvas" width="640" height="480"></div>  */}
        </CCol>
      </CRow>      
    </CContainer>
    </>
  )
}

export default Tables1

import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilArrowCircleRight,
  cilQrCode,
  cilVerticalAlignBottom,
  cilTrash,
} from "@coreui/icons";
import { QRCodeSVG } from "qrcode.react";
import {
  getTables,
  deleteTable,
  downloadQRCode,
} from "../../services/TablesService.js";
import { refreshToken } from "../../services/UsersService.js";

/**
 * @description View for Tables
 * This view shows all tables that have been added and their corresponding QR codes. Tables can also be deleted.
 */
const Tables = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [tables, setTables] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    refreshToken(setToken, setExpire);
    getTables(setTables);
  }, []);

  var newURL = "ws://" + "192.168.1.193" + ":9090";
  var ros = new ROSLIB.Ros({
    url: newURL,
  });

  function sendLocation(out_message) {
    var outputTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/recognizer/output",
      messageType: "std_msgs/String",
    });

    var out_string = new ROSLIB.Message({});
    out_string.data = out_message;
    outputTopic.publish(out_string);
    console.log("output publisher: " + out_string.data);
  } // end sendLocation */

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://192.168.1.128:9000/token");
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
      <CContainer>
        <CRow className="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
          <CButton
            color="secondary"
            className="col-auto"
            onClick={() => setVisible(!visible)}
          >
            <CIcon icon={cilQrCode} style={{ color: "white" }} size="xl" />
          </CButton>
        </CRow>
        <CRow
          className="mb-4"
          xs={{ cols: 1 }}
          sm={{ cols: 2 }}
          md={{ cols: 2 }}
          xl={{ cols: 4 }}
        >
          {tables.map((table, index) => {
            return (
              <CCol key={table.id} className="mb-4">
                <CCard className="text-center" style={{ width: "18rem" }}>
                  <CCardBody>
                    <CIcon
                      className="float-end"
                      style={{ color: "red" }}
                      icon={cilTrash}
                      id={table.id}
                      onClick={deleteTable}
                    />
                    <p></p>
                    <h2 className="card-title">{table.id}</h2>
                    <h5 className="card-title">Mesa</h5>
                    <div className="d-grid gap-2">
                      <CButton
                        color="secondary"
                        onClick={() =>
                          sendLocation(
                            "{'x' : " +
                              table.positionX +
                              ", 'y' : " +
                              table.positionY +
                              "}"
                          )
                        }
                      >
                        Enviar <CIcon icon={cilArrowCircleRight} />
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            );
          })}
        </CRow>
      </CContainer>
      <CModal
        size="xl"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>QR's de las mesas</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow
              className="mb-4"
              xs={{ cols: 1 }}
              sm={{ cols: 2 }}
              md={{ cols: 2 }}
              xl={{ cols: 4 }}
            >
              {tables.map((table, index) => {
                return (
                  <CCol key={table.id} className="mb-4">
                    <CCard className="text-center" style={{ width: "14rem" }}>
                      <CCardBody>
                        <QRCodeSVG
                          id={"qr" + table.id}
                          className="mb-4"
                          value={table.qrURL}
                        />
                        <CButton
                          color="secondary"
                          onClick={(e) => downloadQRCode(e, table.id)}
                        >
                          <CIcon size="xs" icon={cilVerticalAlignBottom} />{" "}
                          Descargar
                        </CButton>
                      </CCardBody>
                    </CCard>
                  </CCol>
                );
              })}
            </CRow>
          </CContainer>
        </CModalBody>
      </CModal>
    </>
  );
};

export default Tables;

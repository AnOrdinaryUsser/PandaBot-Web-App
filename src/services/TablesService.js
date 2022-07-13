/**
 * Module for tables management
 * @module TablesService
 */
import axios from "axios";

/**
 * Get all tables in system
 * @method getTables
 * @param {Array} setTables Array of all tables
 */
export const getTables = async (setTables) => {
  const response = await axios.get("http://192.168.1.128:9000/getTables", {});
  setTables(response.data);
  console.log(response.data);
};

/**
 * Add a table
 * @method addTable
 * @param {*} e Event
 * @param {Bool} setValidated Validate data form
 */
export const addTable = async (e, setValidated) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);
  e.preventDefault();
  try {
    /* const response = await axios.get(
      "http://192.168.1.193:10000/getPosition",
      {}
    );
    console.log(response.data);
    const result = JSON.stringify(response.data)
      .slice(14, 45)
      .replace("\\ny", "")
      .split(":");
    console.log(result);
    console.log(result[0], result[1]); */
    await axios.post("http://192.168.1.128:9000/addTable", {
      id: id.value,
      seats: seats.value,
      positionX: "0",
      positionY: "0",
      qrURL: "http://192.168.1.128:3000/clientCart?mesa=" + id.value,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Delete a table
 * @method deleteTable
 * @param {*} e Event
 */
export const deleteTable = async (e) => {
  try {
    await axios.post("http://192.168.1.128:9000/deleteTable", {
      id: e.currentTarget.id,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Download QRCode
 * @method downloadQRCode
 * @param {*} e Event
 * @param {Integer} id Identifier of QR
 */
export const downloadQRCode = (e, id) => {
  e.stopPropagation();
  console.log(id);
  const svg = document.getElementById("qr" + id);
  console.log(svg);
  if (svg == null) return;
  const svgXML = new XMLSerializer().serializeToString(svg);
  const dataUrl = "data:image/svg," + encodeURIComponent(svgXML);
  console.log(dataUrl);

  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = "Mesa " + id + ".svg";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

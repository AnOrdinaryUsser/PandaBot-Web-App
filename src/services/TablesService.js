import axios from "axios";

export const getTables = async (setTables) => {
  const response = await axios.get("http://192.168.1.128:9000/getTables", {});
  setTables(response.data);
  console.log(response.data);
};

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

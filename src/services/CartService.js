import axios from "axios";

export const getCart = async (tableID, setCart) => {
  const response = await axios.get(
    "http://192.168.1.50:9000/getCart?mesa=" + tableID,
    {}
  );
  setCart(response.data);
  console.log(response.data);
};

export const addProductToCart = async (e, tableID, productID) => {
  e.stopPropagation();
  console.log("tableID: " + tableID + " productID: " + productID);
  try {
    await axios.post("http://192.168.1.50:9000/addProductToCart", {
      tableID: tableID,
      productID: productID,
    });
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

export const destroyProductCart = async (e, tableID, productID) => {
  e.stopPropagation();
  console.log("tableID: " + tableID + " productID: " + productID);
  try {
    await axios.post("http://192.168.1.50:9000/destroyProductCart", {
      tableID: tableID,
      productID: productID,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

export const cancelOrder = async (tableID) => {
    try {
      await axios.post("http://192.168.1.50:9000/cancelOrder", {
        tableID: tableID,
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

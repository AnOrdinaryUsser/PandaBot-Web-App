/**
 * Module for shopping trolley processing
 * @module CartService
 */
import axios from "axios";

/**
 * Get the cart of a table
 * @method getCart
 * @param {Integer} tableID Identifier of a table
 * @param {Array} setCart Array to get all products of a table
 */
export const getCart = async (tableID, setCart) => {
  const response = await axios.get(
    "http://192.168.1.128:9000/getCart?mesa=" + tableID,
    {}
  );
  setCart(response.data);
  console.log(response.data);
};

/**
 * Add a product to a table cart
 * @method addProductToCart
 * @param {*} e Event
 * @param {Integer} tableID Identifier of a table
 * @param {Integer} productID Identifier of a product
 */
export const addProductToCart = async (e, tableID, productID) => {
  e.stopPropagation();
  console.log("tableID: " + tableID + " productID: " + productID);
  try {
    await axios.post("http://192.168.1.128:9000/addProductToCart", {
      tableID: tableID,
      productID: productID,
    });
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Delete a product from a cart
 * @method destroyProductCart
 * @param {*} e Event
 * @param {Integer} tableID Identifier of a table
 * @param {Integer} productID Identifier of a product
 */
export const destroyProductCart = async (e, tableID, productID) => {
  e.stopPropagation();
  console.log("tableID: " + tableID + " productID: " + productID);
  try {
    await axios.post("http://192.168.1.128:9000/destroyProductCart", {
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

/**
 * Cancel the order and clean cart
 * @method cancelOrder
 * @param {Integer} tableID Identifier of a table
 */
export const cancelOrder = async (tableID) => {
  try {
    await axios.post("http://192.168.1.128:9000/cancelOrder", {
      tableID: tableID,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

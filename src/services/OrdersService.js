/**
 * Module for orders management
 * @module OrdersService
 */
import axios from "axios";

/**
 * Get a order with a tableID
 * @method getOrder
 * @param {Integer} tableID Identifier of a table
 * @param {Array} setOrder Array of a order
 */
export const getOrder = async (tableID, setOrder) => {
  const response = await axios.post("http://192.168.1.128:9000/getOrder", {
    tableID: tableID,
  });
  setOrder(response.data);
  console.log(response.data);
};

/**
 * Get all orders in system
 * @method getOrders
 * @param {Array} setOrders Array of orders
 */
export const getOrders = async (setOrders) => {
  const response = await axios.get("http://192.168.1.128:9000/getOrders", {});
  setOrders(response.data);
  console.log(response.data);
};

/**
 * Add a order to system
 * @method addOrder
 * @param {*} e Event
 * @param {Float} totalPrice Total price of all products
 * @param {Integer} id Identifier of a table
 */
export const addOrder = async (e, totalPrice, id) => {
  e.stopPropagation();
  console.log("totalPrice: " + totalPrice + "mesa: " + id);
  try {
    await axios.post("http://192.168.1.128:9000/addOrder", {
      totalPrice: totalPrice,
      id: id,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Change status of an order
 * @method statusOrder
 * @param {Integer} tableID Identifier of a table
 */
export const statusOrder = async (tableID) => {
  try {
    await axios.post("http://192.168.1.128:9000/statusOrder", {
      id: tableID,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

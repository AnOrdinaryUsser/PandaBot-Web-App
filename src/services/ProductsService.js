/**
 * Module for products management
 * @module ProductsService
 */
import axios from "axios";

/**
 * Save a file and his fileName
 * @method saveFile
 * @param {*} e Ecent
 * @param {Object} setFile File (.png, .jpeg, .jpg) 
 * @param {String} setFileName Name of a file
 */
export const saveFile = (e, setFile, setFileName) => {
  setFile(e.target.files[0]);
  setFileName(e.target.files[0].name);
};

/**
 * Get all products in system
 * @method getProducts
 * @param {Array} setProducts Array of products
 */
export const getProducts = async (setProducts) => {
  const response = await axios.get("http://192.168.1.128:9000/getProducts", {});
  console.log(response.data);
  setProducts(response.data);
};

/**
 * Get a product with his identifier
 * @method getProduct
 * @param {Integer} productID Identifier of a product
 * @param {Array} setProduct Array of a product
 */
export const getProduct = async (productID, setProduct) => {
  const response = await axios.post("http://192.168.1.128:9000/getProduct", {
    id: productID,
  });
  setProduct(response.data);
  console.log(response.data);
};

/**
 * Delete a product
 * @method deleteProduct
 * @param {*} e Event
 */
export const deleteProduct = async (e) => {
  try {
    await axios.post("http://192.168.1.128:9000/deleteProduct", {
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
 * Modify a product 
 * @method modifyProduct
 * @param {*} e Event
 * @param {Integer} productID Identifier of a product
 * @param {Bool} setValidated Validate data form
 * @param {Object} file File (.png, .jpeg, .jpg) 
 * @param {String} fileName Name of a file
 * @param {Bool} selected Bool to open modal window
 */
export const modifyProduct = async (
  e,
  productID,
  setValidated,
  file,
  fileName,
  selected
) => {
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);

  e.preventDefault();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  console.log(formData.get("fileName"));

  try {
    const res = await axios.post(
      "http://192.168.1.128:9000/uploadImg",
      formData
    );
    console.log(res);
    await axios.post("http://192.168.1.128:9000/modifyProduct", {
      id: productID,
      name: productName.value,
      description: descp.value,
      price: price.value,
      allergens: JSON.stringify(selected),
      img: formData.get("fileName"),
      section: section.value,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Add a product
 * @method addProduct
 * @param {*} e Event
 * @param {Bool} setValidated Validate data form
 * @param {Object} file File (.png, .jpeg, .jpg) 
 * @param {String} fileName Name of a file
 * @param {Bool} selected Bool to open a model window
 */
export const addProduct = async (e, setValidated, file, fileName, selected) => {
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);

  e.preventDefault();

  //////////////
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  console.log(formData.get("fileName"));
  //////////////

  try {
    const res = await axios.post(
      "http://192.168.1.128:9000/uploadImg",
      formData
    );
    console.log(res);
  } catch (ex) {
    console.log(ex);
  }
  try {
    await axios.post("http://192.168.1.128:9000/addProduct", {
      name: productName.value,
      description: descp.value,
      price: price.value,
      allergens: JSON.stringify(selected),
      img: formData.get("fileName"),
      section: section.value,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      console.log("Error añadiendo un producto");
    }
  }
};

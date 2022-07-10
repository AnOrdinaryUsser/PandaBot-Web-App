import axios from "axios";

  export const saveFile = (e, setFile, setFileName) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }; 

  export const getProducts = async (setProducts) => {
    const response = await axios.get('http://192.168.1.50:9000/getProducts', {
    });
    console.log(response.data)
    setProducts(response.data);
  }


  export const getProduct = async (productID, setProduct) => {
    const response = await axios.post('http://192.168.1.50:9000/getProduct', {
      id: productID,
    });
    setProduct(response.data);
    console.log(response.data)
  }

  export const deleteProduct = async (e) => {
    try {
      await axios.post('http://192.168.1.50:9000/deleteProduct', {
        id: e.currentTarget.id,
      });
      window.location.reload();
  } catch (error) {
      if (error.response) {
          setMsg(error.response.data.msg);
      }
  }
  }

  export const modifyProduct = async (e, productID, setValidated, file, fileName) => {
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    console.log(formData.get("fileName"))

    try {
     /*  const res = await axios.post(
        "http://192.168.1.50:9000/uploadImg",
        formData
      );
      console.log(res) */
      console.log("AAAAAAAAAAAAAAAAAAAA")
      await axios.post('http://192.168.1.50:9000/modifyProduct', {
          id: productID,
          name: productName.value,
          description: descp.value,
          price: price.value,
          allergens: JSON.stringify(selected),
          img:"mierda",
          section: section.value
      });
      window.location.reload();
  } catch (error) {
      if (error.response) {
          setMsg(error.response.data.msg);
      }
  }
  }
  
  export const addProduct = async (e, setValidated, file, fileName) => {
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    e.preventDefault();


    //////////////
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    console.log(formData.get("fileName"))
    //////////////

    try {
      const res = await axios.post(
        "http://192.168.1.50:9000/uploadImg",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
    try {
        await axios.post('http://192.168.1.50:9000/addProduct', {
          name: productName.value,
          description: descp.value,
          price: price.value,
          allergens: JSON.stringify(selected),
          img:formData.get("fileName"),
          section: section.value
        });
        window.location.reload();
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}

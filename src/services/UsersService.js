/**
 * Module for users management
 * @module UsersService
 */
import axios from "axios";
import jwt_decode from "jwt-decode";

/**
 * Refresh identifier of an user
 * @method refreshToken
 * @param {String} setToken Session identifier of an user
 * @param {String} setExpire Time to expire a identifier
 * @param {String} setName Name of the user
 * @param {String} setEmail Email of the user
 */
export const refreshToken = async (setToken, setExpire, setName, setEmail) => {
  try {
    const response = await axios.get("http://192.168.1.128:9000/token");
    setToken(response.data.accessToken);
    console.log(response);
    const decoded = jwt_decode(response.data.accessToken);
    setName(decoded.name);
    setEmail(decoded.email);
    setExpire(decoded.exp);
  } catch (error) {
    if (error.response) {
      window.location.replace("/");
    }
  }
};

/**
 * Get all users in system
 * @method getUsers
 * @param {Array} setUsers Array of all users 
 * @param {String} token Session identifer of an user
 * @param {Object} axiosJWT Axios token
 */
export const getUsers = async (setUsers, token, axiosJWT) => {
  const response = await axiosJWT.get("http://192.168.1.128:9000/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setUsers(response.data);
};

/**
 * Delete an user
 * @method deleteUser
 * @param {*} e Event
 */
export const deleteUser = async (e) => {
  try {
    await axios.post("http://192.168.1.128:9000/deleteUser", {
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
 * Add an user
 * @method addUser
 * @param {*} e Event
 * @param {Bool} setValidated Validate data form
 */
export const addUser = async (e, setValidated) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);

  e.preventDefault();
  try {
    await axios.post("http://192.168.1.128:9000/users", {
      name: user.value,
      email: email.value,
      password: pass.value,
      confPassword: repeatPass.value,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Modify attributes of an user
 * @method modifyUser
 * @param {*} e Event
 * @param {String} name Name of an user
 * @param {Bool} setValidated Validate data form
 */
export const modifyUser = async (e, name, setValidated) => {
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);
  e.preventDefault();

  try {
    await axios.post("http://192.168.1.128:9000/modifyUser", {
      username: name,
      name: nombre.value,
      email: emailInput.value,
      password: pass.value,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Login in system
 * @method Auth
 * @param {*} e Event
 * @param {Object} setValidated Validate data form
 */
export const Auth = async (e, setValidated) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);
  const { user, password } = e.target.elements;
  e.preventDefault();
  try {
    await axios.post("http://192.168.1.128:9000/login", {
      user: user.value,
      password: password.value,
    });
    window.location.replace("/dashboard");
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Register of an user
 * @method Register
 * @param {*} e Event
 * @param {Bool} setValidated Validate data form 
 */
export const Register = async (e, setValidated) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);

  e.preventDefault();
  try {
    await axios.post("http://192.168.1.128:9000/users", {
      name: user.value,
      email: email.value,
      password: pass.value,
      confPassword: repeatPass.value,
    });
    window.location.replace("/");
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

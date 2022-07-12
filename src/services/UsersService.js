import axios from "axios";

export const refreshToken = async (setToken, setExpire) => {
  try {
    const response = await axios.get("http://192.168.1.128:9000/token");
    setToken(response.data.accessToken);
    setExpire(decoded.exp);
    console.log(response);
    const decoded = jwt_decode(response.data.accessToken);
  } catch (error) {
    if (error.response) {
      navigate("/");
    }
  }
};

export const getUsers = async (setUsers, token, axiosJWT) => {
  const response = await axiosJWT.get("http://192.168.1.128:9000/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setUsers(response.data);
};

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

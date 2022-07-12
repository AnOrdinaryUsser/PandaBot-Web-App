/**
 * Module for reset a password
 * @module MailService
 */
import axios from "axios";

/**
 * Send an email with an URL to change password
 * @method forgotPassword
 * @param {*} e Event
 * @param {Bool} setValidated Validate data form
 */
export const forgotPassword = async (e, setValidated) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);

  try {
    await axios.post("http://192.168.1.50:9000/recoverPassword", {
      email: email.value,
    });
    window.location.replace("http://192.168.1.50:3000/SentEmail");
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Change user password (new password)
 * @method changePassword
 * @param {*} e Event
 * @param {String} token Identifier of an user
 * @param {Bool} setValidated Validate data form
 */
export const changePassword = async (e, token, setValidated) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);

  try {
    await axios.post("http://192.168.1.50:9000/resetPassword", {
      token: token,
      pass: password.value,
    });
    window.location.replace("/");
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

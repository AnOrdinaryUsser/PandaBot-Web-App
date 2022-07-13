/**
 * Module for sections management
 * @module SectionsService
 */
import axios from "axios";

/**
 * Get all sections in system
 * @method getSections
 * @param {Array} setSections Array of all sections
 */
export const getSections = async (setSections) => {
  const response = await axios.get("http://192.168.1.128:9000/getSections", {});
  setSections(response.data);
  console.log(response.data);
};

/**
 * Get a section with an identifier
 * @method getSection
 * @param {Integer} sectionID Identifier of a section
 * @param {Array} setSection Array with one section
 */
export const getSection = async (sectionID, setSection) => {
  const response = await axios.post("http://192.168.1.128:9000/getSection", {
    id: sectionID,
  });
  setSection(response.data);
  console.log(response.data);
};

/**
 * Delete a section
 * @method deleteSection
 * @param {*} e Event
 */
export const deleteSection = async (e) => {
  try {
    await axios.post("http://192.168.1.128:9000/deleteSection", {
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
 * Add a section
 * @method addSection
 * @param {*} e Event
 * @param {Bool} setValidated Validate data form
 */
export const addSection = async (e, setValidated) => {
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);
  e.preventDefault();
  try {
    await axios.post("http://192.168.1.128:9000/addSection", {
      name: sectionInput.value,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

/**
 * Modify a section name
 * @method modifySection
 * @param {*} e Event
 * @param {Integer} sectionID Identifier of a section
 * @param {Bool} setValidated Validate data form
 */
export const modifySection = async (e, sectionID, setValidated) => {
  console.log("SectionID: " + sectionID + "Name: " + sectionInputModify.value);
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);
  e.preventDefault();

  try {
    await axios.post("http://192.168.1.128:9000/modifySection", {
      id: sectionID,
      name: sectionInputModify.value,
    });
    window.location.reload();
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
      console.log(msg);
    }
  }
};

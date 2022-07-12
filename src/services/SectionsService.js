import axios from "axios";

    export const getSections = async (setSections) => {
        const response = await axios.get('http://192.168.1.128:9000/getSections', {
        });
        setSections(response.data);
        console.log(response.data)
    }

    export const getSection = async (sectionID, setSection) => {
        const response = await axios.post("http://192.168.1.128:9000/getSection", {
          id: sectionID,
        });
        setSection(response.data);
        console.log(response.data);
    }

    export const deleteSection = async (e) => {
        try {
          await axios.post('http://192.168.1.128:9000/deleteSection', {
            id: e.currentTarget.id,
          });
          window.location.reload();
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          }
      }
    }

    export const addSection = async (e,setValidated) => {
      const form = e.currentTarget
  
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()
      }
      setValidated(true)
      e.preventDefault();
      try {
        await axios.post('http://192.168.1.128:9000/addSection', {
            name: sectionInput.value,
        });
        window.location.reload();
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
    }

    export const modifySection = async (e, sectionID, setValidated) => {
      console.log("SectionID: " + sectionID + "Name: " + sectionInputModify.value)
      const form = e.currentTarget

      if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      }
      setValidated(true)
      e.preventDefault();

      try {
      await axios.post('http://192.168.1.128:9000/modifySection', {
          id: sectionID,
          name: sectionInputModify.value,
      });
      window.location.reload();
      } catch (error) {
      if (error.response) {
          setMsg(error.response.data.msg);
          console.log(msg)
      }
      }
  }
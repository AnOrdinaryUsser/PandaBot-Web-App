import axios from "axios";

    export const getOrders = async (setOrders) => {
        const response = await axios.get('http://192.168.1.50:9000/getOrders', {
        });
        setOrders(response.data);
        console.log(response.data)
    }

    export const statusOrder = async (tableID) => {
        try {
            await axios.post('http://192.168.1.50:9000/statusOrder', {
                id: tableID
            });
            window.location.reload();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
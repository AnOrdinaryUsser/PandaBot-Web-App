import axios from "axios";

    export const getCart = async (tableID, setCart) => {
        const response = await axios.get('http://192.168.1.50:9000/getCart?mesa='+tableID, {
        });
        setCart(response.data);
        console.log(response.data)
    }
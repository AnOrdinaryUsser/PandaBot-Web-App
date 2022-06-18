import Tables from "../models/TableModel.js";
import Products from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import { Op } from "sequelize";
import Order from "../models/OrderModel.js";

export const addOrder = async(req, res) => {
    const { totalPrice, id } = req.body;
    try {
        //Check if table & product exits
        const cart = await Cart.findOne({ where: {tableId: id } });
        if (cart === null) {
            console.log('Cart not found!')
        } else {
            await Order.create({
                status: "En curso",
                price: totalPrice,
                tableId: id,
            })
        }
        res.json({msg: "Order added!"});
    } catch (error) {
        console.log(error);
    }
}

export const getOrders = async(req, res) => {
    try {
        const products = await Order.findAll();
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}
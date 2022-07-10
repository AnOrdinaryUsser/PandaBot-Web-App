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
        console.log(cart)
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
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.log(error);
    }
}


export const getOrder = async(req, res) => {
    const { tableID } = req.body;
    try {
        const order = await Order.findOne({ where: {tableId: tableID } });
        res.json(order);
    } catch (error) {
         res.json(error);
    }
}

export const statusOrder = async(req, res) => {
    const { id } = req.body;
    try {
        //Check if table & product exits
        const cart = await Order.findOne({ where: {id: id } });
        if (cart === null) {
            console.log('Order not found!')
        } else {
            if (cart.status === "En curso") {
                await Order.update({
                    status: "Enviado",
                }, {where: {status: "En curso", id: id}})
            } else if (cart.status === "Enviado") {
                await Order.update({
                    status: "Pagado",
                }, {where: {status: "Enviado", id: id}})
            } else if (cart.status === "Pagado") {
                await Order.update({
                    status: "Terminado",
                }, {where: {status: "Pagado", id: id}})
            }
        }
        res.json({msg: "Order updated!"});
    } catch (error) {
        console.log(error);
    }
}
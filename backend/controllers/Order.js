/**
 * @file Controller to handle frontend orders requests
 */
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";

/**
 * Module to add an order
 * @module addOrder
 */
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

/**
 * Module to get all orders
 * @module getOrders
 */
export const getOrders = async(req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Module to get an order
 * @module getOrder
 */
export const getOrder = async(req, res) => {
    const { tableID } = req.body;
    try {
        const order = await Order.findOne({ where: {tableId: tableID } });
        res.json(order);
    } catch (error) {
         res.json(error);
    }
}

/**
 * Module to change status of an order
 * @module statusOrder
 */
export const statusOrder = async(req, res) => {
    const { id } = req.body;
    try {
        //Check if table & product exits
        const order = await Order.findOne({ where: {id: id } });
        if (order === null) {
            console.log('Order not found!')
        } else {
            if (order.status === "En curso") {
                await Order.update({
                    status: "Enviado",
                }, {where: {status: "En curso", id: id}})
            } else if (order.status === "Enviado") {
                await Order.update({
                    status: "Pagado",
                }, {where: {status: "Enviado", id: id}})
            } else if (order.status === "Pagado") {
                await Order.destroy({where: {status: "Pagado", id: id}})
                await Cart.destroy({ where: {tableId: order.tableId } });
            }
        }
        res.json({msg: "Order updated!"});
    } catch (error) {
        console.log(error);
    }
}
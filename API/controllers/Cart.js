import Tables from "../models/TableModel.js";
import Products from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import { Op } from "sequelize";

export const addProductToCart = async(req, res) => {
    const { tableID, productID } = req.body;
    console.log("tableID: " + tableID + " productID: " + productID)
    try {
        //Check if table & product exits
        const table = await Tables.findOne({ where: {id: tableID } });
        if(table === null)
            console.log('Table not found!')
        const product = await Products.findOne({ where: {id: productID } });
        if(product === null)
            console.log('Product not found!')
        //Check if the product is added to cart
        //If product not added, add product to cart
        //Else is added, update qty value
        const cartProduct = await Cart.findOne({ where: {productId: productID, tableId: tableID}});
        if (cartProduct === null) {
            const addProduct = await Cart.create({
                qty: 1,
                tableId: table.id,
                productId: product.id
            })
            /* table.setProducts(product) */
        } else {
            await Cart.update({qty: cartProduct.qty + 1}, {where: {qty: {[Op.gte]:1}}})
        }
        res.json({msg: "Product" + {productID} + "added to cart!"});
    } catch (error) {
        console.log(error);
    }
}

export const getCart = async(req, res) => {
    //sconsole.log(req.query.mesa);
    const tableID  = req.query.mesa;
    console.log("tableID: " + tableID)
    try {
        //Check if cart exits
        const cart = await Cart.findAll({ where: {tableId: tableID }, raw: true });
        if(cart === null)
            console.log('Cart not found!')
        //Check if the product is added to cart
        //If product not added, add product to cart
        //Else is added, update qty value
        console.log(cart)
        //const cartProducts = await Products.findAll({ where: {id: cart.productId}});
        //res.json(cartProducts);
    } catch (error) {
        console.log(error);
    }
}
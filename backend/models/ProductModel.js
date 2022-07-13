/**
 * @file Data model for products
 */
import { Sequelize } from "sequelize";
import db from "../config/DataDB.js";
 
const { DataTypes } = Sequelize;
 
const Products = db.define('products',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    allergens:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    img:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    section:{
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Products;
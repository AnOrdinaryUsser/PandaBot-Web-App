import { Sequelize } from "sequelize";
import db from "../config/DataDB.js";
 
const { DataTypes } = Sequelize;
 
const Products = db.define('products',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
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
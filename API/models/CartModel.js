import { Sequelize } from "sequelize";
import db from "../config/DataDB.js";
 
const { DataTypes } = Sequelize;
 
const Cart = db.define('cart',{
    qty:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    freezeTableName:true
  });
 
(async () => {
    await db.sync();
})();
 
export default Cart;
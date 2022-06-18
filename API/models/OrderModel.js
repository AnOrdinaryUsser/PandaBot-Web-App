import { Sequelize } from "sequelize";
import db from "../config/DataDB.js";
 
const { DataTypes } = Sequelize;
 
const Order = db.define('order',{
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
  },{
    freezeTableName:true
  });
 
(async () => {
    await db.sync();
})();
 
export default Order;
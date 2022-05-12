import { Sequelize } from "sequelize";
import db from "../config/DataDB.js";
 
const { DataTypes } = Sequelize;
 
const Tables = db.define('tables',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    seats:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    positionX:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    positionY:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Tables;
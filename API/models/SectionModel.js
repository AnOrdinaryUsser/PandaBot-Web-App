/**
 * @file Data model for sections
 */
import { Sequelize } from "sequelize";
import db from "../config/DataDB.js";
 
const { DataTypes } = Sequelize;
 
const Sections = db.define('sections',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Sections;
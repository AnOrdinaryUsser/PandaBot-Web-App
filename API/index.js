import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import db2 from "./config/DataDB.js";
import router from "./routes/index.js";
import Sections from "./models/SectionModel.js";
import Products from "./models/ProductModel.js";
import Tables from "./models/TableModel.js";
import Cart from "./models/CartModel.js";
import { Sequelize } from "sequelize";
dotenv.config();
const app = express();
const { DataTypes } = Sequelize;

 
app.use(cors({ credentials:true, origin:'http://192.168.1.128:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use('/public',express.static('public'))
 
app.listen(9000, ()=> console.log('Server running at port 9000'));

Sections.hasMany(Products);
Products.belongsTo(Sections, {foreignKey: "section", as:"id_"});


/* const Cart = db2.define('cart',{
  qty:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  freezeTableName:true
}); */

Products.belongsToMany(Tables, { through: 'cart' });
Tables.belongsToMany(Products, { through: 'cart' });



db2.sync().then(() => {
    /* 
    Sections.create({id:1, name: "Entrantes"});
    Sections.create({id:2, name: "Platos"});
    Sections.create({id:3, name: "Postres"});
    Sections.create({id:4, name: "Refrescos"});
    Sections.create({id:5, name: "Bebidas Alcoholicas"});
    Sections.create({id:6, name: "Vinos"}); 
    Sections.create({id:7, name: "Cafés"}); 
    */
  })



  
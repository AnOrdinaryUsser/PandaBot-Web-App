import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import db from "./config/AuthDB.js";
import db2 from "./config/DataDB.js";
import router from "./routes/index.js";
import Sections from "./models/SectionModel.js";
import Products from "./models/ProductModel.js";
import Tables from "./models/TableModel.js";
import Cart from "./models/CartModel.js";
import Order from "./models/OrderModel.js";
import Users from "./models/UserModel.js";
import { Sequelize } from "sequelize";
dotenv.config();
const app = express();
const { DataTypes } = Sequelize;
const DB_PASSWORD = process.env.DB_PASSWORD
 
app.use(cors({ credentials:true, origin:'http://192.168.1.50:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use('/public',express.static('public'))
 
app.listen(9000, ()=> console.log('Server running at port 9000'));

Sections.hasMany(Products);
Products.belongsTo(Sections, {foreignKey: "section", as:"id_"});

Products.belongsToMany(Tables, { through: 'cart' });
Tables.belongsToMany(Products, { through: 'cart' });

Cart.hasOne(Order, {foreignKey: 'tableId'});
Order.belongsTo(Cart);

const salt = await bcrypt.genSalt();
const hashPassword = await bcrypt.hash(DB_PASSWORD, salt);

db.sync().then(
  result => {
      return Users.findByPk(1);
  })
.then(user => {
  if (!user) {
      return Users.create({
          name: 'admin',
          email: "pandabot-not-reply@hotmail.com",
          password: hashPassword,
          role: "admin"
      })
  }
  return user;
}).catch(err => console.error(err));

   /* 
    Sections.create({id:1, name: "Entrantes"});
    Sections.create({id:2, name: "Platos"});
    Sections.create({id:3, name: "Postres"});
    Sections.create({id:4, name: "Refrescos"});
    Sections.create({id:5, name: "Bebidas Alcoholicas"});
    Sections.create({id:6, name: "Vinos"}); 
    Sections.create({id:7, name: "Cafés"}); 
    */
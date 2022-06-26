import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { addTable, getTables, deleteTable } from "../controllers/Tables.js";
import { addProduct, modifyProduct, deleteProduct, getProducts, getProduct, uploadImg } from "../controllers/Products.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import multer from 'multer';
import path from 'path';
import { getSections } from "../controllers/Sections.js";
import { addProductToCart, getCart } from "../controllers/Cart.js";
import { addOrder, getOrders, statusOrder } from "../controllers/Order.js";
import { recoverPassword } from "../controllers/Mail.js";
 
const router = express.Router();

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})
 
var upload = multer({
    storage: storage
});


// User DB
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// Tables DB
router.post('/addTable', addTable);
router.get('/getTables', getTables);
router.post('/deleteTable', deleteTable);

// Products DB
router.post('/addProduct', addProduct);
router.post('/modifyProduct', modifyProduct);
router.post('/deleteProduct', deleteProduct);
router.get('/getProducts', getProducts); 
router.post('/getProduct', getProduct); 
router.post('/uploadImg',upload.single('file'),uploadImg); 

// Sections DB
router.get('/getSections', getSections); 

// Cart DB
router.post('/addProductToCart', addProductToCart);
router.get('/getCart', getCart);

// Order DB
router.post('/addOrder', addOrder);
router.get('/getOrders', getOrders);
router.post('/statusCart', statusOrder);

// Mail
router.post('/recoverPassword', recoverPassword)

export default router;
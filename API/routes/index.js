import express from "express";
import { getUsers, Register, Login, Logout, modifyUser, deleteUser } from "../controllers/Users.js";
import { addTable, getTables, deleteTable } from "../controllers/Tables.js";
import { addProduct, modifyProduct, deleteProduct, getProducts, getProduct, uploadImg } from "../controllers/Products.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import multer from 'multer';
import path from 'path';
import { addSection, getSections, getSection, deleteSection, modifySection } from "../controllers/Sections.js";
import { addProductToCart, deleteProductToCart, getCart } from "../controllers/Cart.js";
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
router.post('/modifyUser', modifyUser);
router.post('/users', Register);
router.post('/deleteUser', deleteUser);
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
router.post('/addSection', addSection); 
router.get('/getSections', getSections); 
router.post('/getSection', getSection); 
router.post('/deleteSection', deleteSection);
router.post('modifySection', modifySection) 

// Cart DB
router.post('/addProductToCart', addProductToCart);
router.post('/deleteProductToCart', deleteProductToCart);
router.get('/getCart', getCart);

// Order DB
router.post('/addOrder', addOrder);
router.get('/getOrders', getOrders);
router.post('/statusCart', statusOrder);

// Mail
router.post('/recoverPassword', recoverPassword)

export default router;
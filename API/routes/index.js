import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { addTable, getTables } from "../controllers/Tables.js";
import { addProduct, getProducts, uploadImg } from "../controllers/Products.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import multer from 'multer';
import path from 'path';
 
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

// Products DB
router.post('/addProduct', addProduct);
router.get('/getProducts', getProducts); 
router.post('/uploadImg',upload.single('file'),uploadImg); 

export default router;
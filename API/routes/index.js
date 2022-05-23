import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { addTable, getTables } from "../controllers/Tables.js";
import { addProduct, getProducts } from "../controllers/Products.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();

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

export default router;
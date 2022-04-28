const express = require('express')
const Login = require('../controllers/Users')
const router = express.Router();

router.post('/login', Login);

export default router;
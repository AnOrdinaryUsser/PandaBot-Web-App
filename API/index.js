require("dotenv").config()  //this will allow us to pull params from .env file
const express = require('express')
const app = express()
const port = process.env.PORT
const request = require('request');
const bcrypt = require("bcrypt")
var cors = require('cors')

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());

const getConnection = require("./config/Database")

getConnection((err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

const router = require('./routes/index')

app.use(router);

app.get('/', (req, res) => {
  var value = req.query["value"]
  console.log(value);

  var value = req.query["value"]
    var dir = 'http://192.168.1.193:10000?value=' + value;
    request(dir, { json: true }, (err, resp, body) => {
        if (err) { return console.log(err); }
    });

  res.json({'value response': value})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




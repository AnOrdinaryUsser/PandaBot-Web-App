const express = require('express')
const app = express()
const port = 9000
const request = require('request');
const bcrypt = require("bcrypt")
var cors = require('cors')


app.use(cors())

app.get('/', (req, res) => {
  var value = req.query["value"]
  console.log(value);

  let ts = Date.now();

  let date_ob = new Date(ts);
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();

  response = hours + ":" + minutes + ":" + seconds
  console.log(response);
  
  var value = req.query["value"]
    var dir = 'http://192.168.1.193:10000?value=' + value;
    request(dir, { json: true }, (err, resp, body) => {
        if (err) { return console.log(err); }
    });

  res.json({'time response': response})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Connection to DB
const mysql = require("mysql")
const db = mysql.createPool({
   connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
   user: "admin",         // "newuser" created in Step 1(e)
   password: "elefante",  // password for the new user
   database: "userdb",      // Database name
   port: "3306"             // port name, "3306" by default
})
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

// Register an user
app.use(express.json())
//middleware to read req.body.<params>

app.post("/register", async (req,res) => {
  const user = req.body.name;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password,10);
  db.getConnection( async (err, connection) => {
   if (err) throw (err)
   const sqlSearch = "SELECT * FROM usertable WHERE user = ?"
   const search_query = mysql.format(sqlSearch,[user])
   const sqlInsert = "INSERT INTO usertable VALUES (0,?,?,?)"
   const insert_query = mysql.format(sqlInsert,[user,email,hashedPassword])
   // ? will be replaced by values
   // ?? will be replaced by string
   await connection.query (search_query, async (err, result) => {
    if (err) throw (err)
    console.log("------> Search Results")
    console.log(result.length)
    if (result.length != 0) {
     connection.release()
     console.log("------> User already exists")
     res.sendStatus(409) 
    } 
    else {
     await connection.query (insert_query, (err, result)=> {
     connection.release()
     if (err) throw (err)
     console.log ("--------> Created new User")
     console.log(result.insertId)
     res.sendStatus(201)
    })
   }
  }) //end of connection.query()
  }) //end of db.getConnection()
  }) //end of app.post()

  //LOGIN (AUTHENTICATE USER)
  app.post("/login", (req, res)=> {
  const user = req.body.name
  const password = req.body.password
  db.getConnection ( async (err, connection)=> {
   if (err) throw (err)
   const sqlSearch = "Select * from userTable where user = ?"
   const search_query = mysql.format(sqlSearch,[user])
   await connection.query (search_query, async (err, result) => {
    connection.release()
    
    if (err) throw (err)
    if (result.length == 0) {
     console.log("--------> User does not exist")
     res.sendStatus(404)
    } 
    else {
       const hashedPassword = result[0].password
       //get the hashedPassword from result
      if (await bcrypt.compare(password, hashedPassword)) {
      console.log("---------> Login Successful")
      res.send(`${user} is logged in!`)
      } 
      else {
      console.log("---------> Password Incorrect")
      res.send("Password incorrect!")
      } //end of bcrypt.compare()
    }//end of User exists i.e. results.length==0
   }) //end of connection.query()
  }) //end of db.connection()
  }) //end of app.post()

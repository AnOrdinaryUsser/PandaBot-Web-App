const getConnection = require("./config/Database")
const mysql = require("mysql")

// Register an user
app.use(express.json())
//middleware to read req.body.<params>

 export const Login = app.post("/register", async (req,res) => {
  const user = req.body.name;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password,10);
  getConnection( async (err, connection) => {
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

  const generateAccessToken = require("./generateAccessToken")
  //import the generateAccessToken function
  //LOGIN (AUTHENTICATE USER, and return accessToken)
  app.post("/login", (req, res)=> {
  const user = req.body.name
  const password = req.body.password
  getConnection ( async (err, connection)=> {
  if (err) throw (err)
  const sqlSearch = "Select * from userTable where user = ?"
  const search_query = mysql.format(sqlSearch,[user])
  console.log(search_query)
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
    console.log(password)
    console.log(result)
    console.log(result[0].password)
  if (await bcrypt.compare(password, hashedPassword)) {
      
      console.log("---------> Login Successful")
      console.log("---------> Generating accessToken")
      const accessToken = jwt.sign({user, password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
      console.log("Access Token:" + accessToken)
      const refreshToken = jwt.sign({user, password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
      console.log("Refresh Token:" + refreshToken)

      res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json({accessToken})
    } else {
      res.json({password: "incorrect"})
      console.log("---------> Password incorrect!")
      
    } //end of Password incorrect
  }//end of User exists
  }) //end of connection.query()
  }) //end of db.connection()
  }) //end of app.post()
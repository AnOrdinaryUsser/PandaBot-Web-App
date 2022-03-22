const express = require('express')
const app = express()
const port = 8000

app.get('/', function (req, res) {
    var value = req.query["value"]
    res.json({"value" : value})
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
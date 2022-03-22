const express = require('express')
const app = express()
const port = 9000
const request = require('request');
var cors = require('cors')

/*app.post('/', (req, res) => {
    var value = req.query["value"]
    var dir = 'http://192.168.1.192:8000/?value=' + value;
    request(dir, { json: true }, (err, resp, body) => {
        if (err) { return console.log(err); }
        res.json({
            "value":body['value']
        })
    });

})
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

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
  
  res.json({'time response': response})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
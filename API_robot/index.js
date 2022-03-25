const express = require('express')
const app = express()
const port = 10000
const rosnodejs = require('rosnodejs');

app.get('/', function (req, res) {
    var value = req.query["value"]
    //res.json({"value" : value})
    console.log(value)
    rosnodejs.initNode('my_node', {onTheFly: true})
    .then(nh => {
      const std_msgs = rosnodejs.require('std_msgs');
      const pub = nh.advertise('/recognizer/output', 'std_msgs/String');
      const msg = new std_msgs.msg.String();
      msg.data = value;
      pub.publish(msg);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

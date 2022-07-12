const express = require('express')
const app = express()
const port = 10000
const rosnodejs = require('rosnodejs')
const cors = require ("cors")
app.use(cors({ credentials:true, origin:'http://192.168.1.50:3000' }))



app.get('/sendLocation', function (req, res) {
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



app.get('/getPosition', function (req, res) {
  /* const nh = rosnodejs.nh;
  var position;
    rosnodejs.initNode('/listener', {onTheFly: true})
    .then(nh => {
      const std_msgs = rosnodejs.require('geometry_msgs');
      nh.subscribe('/robot_pose', 'geometry_msgs/Pose', (data) => {console.log('Got msg on chatter: %j', data);
      position = data
    });
    }) */
    const cp = require('child_process');
  cp.exec('rostopic echo -n 1 /robot_pose/position', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
  }
  res.json({"salida":stdout})
  });
    
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
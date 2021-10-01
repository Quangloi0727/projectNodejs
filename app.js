//"start":"pm2-dev app.js", // không cần restart lại server
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = express();

// lấy req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

global._ = require('underscore');
global.path = require('path');
global._rootPath = path.dirname(require.main.filename);
//set view engine
app.set('view engine', 'ejs');
app.use(require(path.join(_rootPath, 'libs', 'auth')).auth);

//connect mongodb
const dbURI = 'mongodb://localhost:27017/projectNodejs';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connect to db success !"))
    .catch((err) => console.log("connect to db fail", err))


app.use("/", require("./routers/users"));

const server = app.listen(6288, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

global.sio = require('socket.io')(server)

sio.on('connection', function (socket) {
    require(path.join(_rootPath, 'socket', 'io.js'))(socket);
});
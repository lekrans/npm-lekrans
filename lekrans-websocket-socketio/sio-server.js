var express = require("express");
var http = require("http");
var app = express();
// we need to create a http server to be used with socket.io
// but we will use the express (app) to handle the requests instead 
// of a callback function (with (req, res)) ... app = function(req, res, next).

var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);

// add express.static middleware to handle the static files
// in the public folder
app.use(express.static("./public"));

io.on("connection", function(socket) {

    socket.on("chatterichatting", function(message) {  //Receives the 'chat' event from the client (public/js/main.js)
    	socket.broadcast.emit("message", message);
    });

	socket.emit("message", "Welcome to Cyber Chat");

});

console.log("Starting Socket App - http://localhost:3000");

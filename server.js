const express = require("express");
const server = express();

//Middleware


//Apply Middleware
server.use(express.json());

//404 Page not found
server.use((req, res, next) => {
   res.status(404).json({
      message: "Page not found!"
   });
});

//500 Server Errors
server.use((error, req, res, next) => {
   res.status(500).json({
      data: error.toString()
   });
});

module.exports = server;
const express = require("express");
const server = express();

//Middleware


//Apply Middleware
server.use(express.json());

//GET    /
server.get("/", (req, res, next) => {
   res.json({
      message: "Welcome to Web Auth 3 Challenge API"
   });
});

//GET	   /api/users
server.get("/", (req, res, next) => {
   next();
});

//POST	/api/register
server.post("/api/register", (req, res, next) => {
   next();
});

//POST	/api/login
server.post("/api/login", (req, res, next) => {
   next();
});

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
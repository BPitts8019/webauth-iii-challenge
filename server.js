const express = require("express");
const server = express();
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

//Apply Middleware
server.use(express.json());

//GET    /
server.get("/", (req, res, next) => {
   res.json({
      message: "Welcome to Web Auth 3 Challenge API"
   });
});

//API endpoints
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

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

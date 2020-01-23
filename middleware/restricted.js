const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const {authorization} = req.headers;
   
   if (!authorization) {
      return res.status(400).json({
         message: "Please log in"
      });
   }

   jwt.verify(authorization, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
         return res.status(403).json({
            message: "Invalid Token!"
         });
      }

      req.token = payload;
      next();
   });
};
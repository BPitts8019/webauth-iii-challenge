const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const {authorization} = req.headers;
   const INVALID = "You... shall not... PASS!!";
   
   if (!authorization) {
      return res.status(400).json({
         message: INVALID
      });
   }

   jwt.verify(authorization, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
         return res.status(403).json({
            message: INVALID
         });
      }

      req.token = payload;
      next();
   });
};
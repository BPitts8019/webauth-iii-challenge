module.exports = (req, res, next) => {
   const {username, password} = req.body;
   
   if (!username || !password) {
      return res.status(400).json({
         message: "Please provide a username and password."
      });
   }

   req.credentials = {username, password};
   next();
};
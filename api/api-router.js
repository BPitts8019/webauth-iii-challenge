const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users_db = require("./users-model");
const getUserCreds = require("../middleware/creds-input");
// const restricted = require("");

//POST	/api/register
router.post("/register", getUserCreds, async (req, res, next) => {
   if (!req.body.department) {
      return res.status(400).json({message: "Must have a username, password, and department."});
   }

   const  userData = {
      ...req.credentials,
      department: req.body.department
   };

   try {
      const user = await users_db.add(userData);
      res.status(201).json(stripPassword(user));
   } catch (error) {
      next(error);
   }
});

//POST	/api/login
router.post("/login", getUserCreds, async (req, res, next) => {
   const {username, password} = req.credentials;
   const INVALID = "Invalid username or password";
   
   const user = await users_db.findBy({username}).first();
   if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);

      res.json({
         token,
         message: `Welcome ${username}!`
      });
   } else {
      res.status(403).json({message: INVALID});
   }
});

//GET	   /api/users
router.get("/", (req, res, next) => {
   res.json({
      message: `${req.method}  /api${req.url}`
   });
});

//helper functions
function stripPassword ({password, ...user}) {
   return user;
}

function signToken (user) {
   const {id} = user;
   const payload = {id};
   const secret = process.env.JWT_SECRET;
   const options = {
      expiresIn: "1h"
   };

   return jwt.sign(payload, secret, options);
}

module.exports = router;
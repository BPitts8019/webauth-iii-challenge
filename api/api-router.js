const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users_db = require("./users-model");
const getUserCreds = require("../middleware/creds-input");
const restricted = require("../middleware/restricted");

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
   const INVALID = "You... shall not... PASS!!";
   
   try {
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
   } catch (error) {
      next(error);
   }
});

//GET	   /api/users
router.get("/users", restricted, async (req, res, next) => {
   try {
      const users = await users_db.findAll();
      res.json(users);
   } catch (error) {
      next(error);
   }
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
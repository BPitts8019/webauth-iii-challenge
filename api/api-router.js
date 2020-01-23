const router = require("express").Router();
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
router.post("/login", getUserCreds, (req, res, next) => {
   res.json({
      message: `${req.method}  /api${req.url}`
   });
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

module.exports = router;
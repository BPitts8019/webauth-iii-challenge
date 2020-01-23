const router = require("express").Router();
// const auth_db = require("./auth-model");
const users_db = require("../users/users-model");
const getUserCreds = require("../middleware/creds-input");

//POST	/api/register
router.post("/register", getUserCreds(), async (req, res, next) => {
   console.log(`${req.method}  /api${req.url}`);

   try {
      //Username and Password are in req.credentials
      const user = await users_db.add(req.credentials);
      res.status(201).json(stripPassword(user));
   } catch (error) {
      next(error);
   }
});

//POST	/api/login
router.post("/login", (req, res, next) => {
   res.json({
      message: `${req.method}  /api${req.url}`
   });
});

//helper functions
function stripPassword (user) {
   return {
      id: user.id,
      username: user.username
   }
}

module.exports = router;
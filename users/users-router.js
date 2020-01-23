const router = require("express").Router();
const users_db = require("../users/users-model");

//GET	   /api/users
router.get("/", (req, res, next) => {
   res.json({
      message: `${req.method}  /api${req.url}`
   });
});

module.exports = router;
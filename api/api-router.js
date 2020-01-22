const router = require("express").Router();

//GET	   /api/users
router.get("/users", (req, res, next) => {
   res.json({
      message: `${req.method}  /api${req.url}`
   });
});

//POST	/api/register
router.post("/register", (req, res, next) => {
   res.json({
      message: `${req.method}  /api${req.url}`
   });
});

//POST	/api/login
router.post("/login", (req, res, next) => {
   res.json({
      message: `${req.method}  /api${req.url}`
   });
});

module.exports = router;
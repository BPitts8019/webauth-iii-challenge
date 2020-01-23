const router = require("express").Router();
const users_db = require("../users/users-model");

router.use("/", (req, res, next) => {
   next();
});

module.exports = router;
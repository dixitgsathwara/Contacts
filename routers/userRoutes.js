const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  userRegister,
  userLogin,
  userCurrent,
} = require("../controllers/userController");
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/current").get(validateToken,userCurrent);
module.exports = router;

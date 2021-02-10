var express = require('express');
var router = express.Router();
var {adminLogin,adminRegister,adminLogout} = require("../controller/admin")
/* GET users listing. */
router.post("/register",adminRegister);
router.post("/login",adminLogin);
router.delete("/logout",adminLogout)

module.exports = router;

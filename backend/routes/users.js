var express = require('express');
var router = express.Router();
var {userLogin,userRegister,userLogout,updateUser} = require("../controller/user");
var {validateToken}  = require('../middleware/authentication');
/* GET users listing. */
router.post("/register",userRegister);
router.post("/login",userLogin);
router.delete("/logout",userLogout);
router.put('/',validateToken,updateUser);

module.exports = router;

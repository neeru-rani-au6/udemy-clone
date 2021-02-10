var express = require('express');
var router = express.Router();
var {createPaymentToken} = require("../controller/payment")
/* GET users listing. */
router.post("/",createPaymentToken);

module.exports = router;

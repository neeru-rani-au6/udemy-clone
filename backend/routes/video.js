var express = require('express');
var router = express.Router();
var { createpost, getallpost, getonepost } = require("../controller/video")
/* GET users listing. */
router.post("/", createpost);
router.get("/all", getallpost);
router.get("/:id", getonepost)

module.exports = router;

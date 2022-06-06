const router = require("express").Router();

const {POST} = require("./controller");

router.post("/login",POST);

module.exports = router
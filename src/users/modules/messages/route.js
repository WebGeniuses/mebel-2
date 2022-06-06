const router = require("express").Router();
const {POST} = require("./controller");

router.post("/message",POST);

module.exports = router;
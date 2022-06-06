const router = require("express").Router();
const { GET_BY_PAGING, GET_BY_DATE, SEARCH } = require("./controller");



router.get("/user",GET_BY_PAGING)
router.get("/userdate",GET_BY_DATE);
router.get("/usersearch",SEARCH)


module.exports = router
const  router = require("express").Router();
const { GET_BY_ID, GET_BY_DATE, POST, PUT, DELETE, GET} = require("./controller");

router.get("/products",GET);
router.get("/product",GET_BY_ID);
router.get("/product/date",GET_BY_DATE);
router.post("/product",POST)
router.put("/product",PUT);
router.delete("/product",DELETE)

module.exports = router;
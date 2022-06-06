const router = require("express").Router();
const {GET, GET_BY_ID, GET_BY_DATE, POST, PUT,DELETE} = require("./controller");
const auth = require("../../middleware/Auth");


router.get("/get",GET) 
http://localhost:10000/get



router.get("/admin",GET_BY_ID);
http://localhost:10000/admin?id=6293dd2c420d578d10dee17d

router.get("/date",GET_BY_DATE);
http://localhost:10000/date?from=.....&to=.......                 //.....  = 2022-05-29T20:53:00.191Z

router.post("/admin",POST);
http://localhost:10000/admin

router.put("/admin",PUT);
http://localhost:10000/admin?id=.....                              // object id

router.delete("/admin",DELETE)
http://localhost:10000/admin?id=.....                                // object id

module.exports = router;

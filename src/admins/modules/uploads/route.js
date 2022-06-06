const router = require("express").Router();
const {GET} = require("./controller") ;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join("src","common","db","photo"));
    },

    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:storage,
}).single("file");


router.get("/photo",upload,GET)

module.exports = router;
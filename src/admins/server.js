const server = require("./modules/index");
const {ADMIN} = require("../../config/config");
const { connectDB } = require("../common");


connectDB()
.then(()=>{
    console.log("Connect Database ");
    server.listen(ADMIN,()=>{
        console.log("http://localhost:"+ADMIN);
    })
})
.catch((e)=>{
    console.log(" Database feiled ");
})
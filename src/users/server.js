const server = require("./modules");
const {USER} = require("../../config/config");
const { connectDB } = require("../common");


connectDB()
.then(()=>{
    console.log("user seccessfully conneted database ");
    server.listen(USER,console.log("http://localhost:"+USER));
}).catch((e)=>{
    console.log("user database feiled : ",e);
})


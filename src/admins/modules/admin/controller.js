const { count } = require("console");
const { Admin } = require("mongodb");
const { AdminModel } = require("../../../common/db/models/admin.model");

module.exports = {

    GET  : async (req,res)=>{
        try {
            const foundUser = await AdminModel
                .aggregate([
                    // { $match: { _id: id } },
                    { $project: {_id:1, fullName: 1, phoneNumber: 1 } },
                    { $sort: { first_name: 1 } }
                ]);
                const total = await AdminModel.countDocuments();
                if(!foundUser) throw new Error("not found user")
                res.status(200).send({
                    total:total,
                    data:foundUser,
                    
                })
        }catch (e) {
            res.status(404).send({
                error: e.message,
            })
        }
    },

    GET_BY_ID  : async (req,res)=>{
        try {
            const id = req.query.id
            const foundUser = await AdminModel
                .findById(id,{
                    password:0,
                })  //  $match menda ishlamadi

                // .aggregate([
                //     { $match: { _id: id } },
                //     { $project: { fullName: 1, phoneNumber: 1 } },
                //     { $sort: { userName: 1 } }
                // ]);

                if(!foundUser) throw new Error("not found user")
                res.status(200).send({
                    data:foundUser
                })
        }catch (e) {
            res.status(404).send({
                error: e.message,
            })
        }
    },

    GET_BY_DATE: async (req, res)=>{
        try {

    const from = req.query.from;
    const to = req.query.to;
    let query = {};
    if(from){
        query.$and = [
            {
                createdAt:{
                    $gte:from,
                },
            },
            {
                createdAt:{
                    $lte:to,
                },
            },
        ]
    }
    const foundUser = await AdminModel.find(query,{
        password:0
    
       });
        const total = await AdminModel.countDocuments(query);

        res.send({
            total: total,
            data:foundUser
        });
        } catch (e) {
            res.send({
                error:404 + "Xatolik",
                data:e
            })
        }

},

    POST: async (req, res) =>{
       try {
        const newAdmin =  req.body;
        await AdminModel.insertMany(newAdmin);
        const foundUser = await AdminModel.find({userName:newAdmin.userName})
        res.status(200).send({
            message:"congratulations",
            data:foundUser
            
        })
       } catch (e) {
           res.send({
               error:e.message
           })
       }
    },

    PUT: async (req,res)=>{
       try {
        const id = req.query.id;
        const updateUser = req.body;
        // const id = updateUser._id;
        const foundUser = await AdminModel.findById(id);

        if(!foundUser) throw new Error("user not found");

       if(!updateUser.userName)
       await AdminModel.updateOne({_id:id},{$set:{ password:updateUser.password}});

       else if(!updateUser.password)
       await AdminModel.updateOne({_id:id},{$set:{userName:updateUser.userName}})

       else {
        await AdminModel.updateOne({_id:id},{$set:{ password:updateUser.password}});
        await AdminModel.updateOne({_id:id},{$set:{userName:updateUser.userName}});
       }
        const found = await AdminModel.find()

        
        res.status(200).send({
            data:found
        })
       } catch (e) {
           res.send({
               error:e.message
           })
       }
    },

    DELETE: async (req, res)=>{
        try {
            const id = req.query.id;

            const found = await AdminModel.findById(id)
        if(!found) throw new Error("user not found ");

         await AdminModel.findByIdAndDelete(id)
         const foundUser = await AdminModel.findById(id)
         if(foundUser) throw new Error("user not delete tray again ");

         res.status(200).send({
             message:"deleted"
         })
        } catch (e) {
            res.send({
                error:e.message 
            })
        }
    }

    
        
}
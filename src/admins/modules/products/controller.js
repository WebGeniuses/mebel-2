
const { ProductModel } = require("../../../common/db/models/product.model");

module.exports = {
    GET: async (req,res)=>{
        try {
            const foundProduct = await ProductModel.find()
            .populate("photoId",{name:1, path:1});
            const total = await ProductModel.countDocuments();
            res.status(200).send({
                total:total,
                data:foundProduct
            })
        } catch (e) {
            res.status(500).send({
                error:e.message
            })
        }
    },


    GET_BY_ID: async (req, res) => {
        try {
            const id = req.query.id

            const foundProduct = await ProductModel.findById(id,{
                createdAt:0,
                updatedAt:0
            }).populate('photoId',{name:1,path:1});

            if (!foundProduct) throw new Error("Product not found")

            res.status(200).send({
                status: 200,
                data: foundProduct
            })
        } catch (e) {
            res.send({
                status: 500,
                error: e.message
            })
        }
    },

    GET_BY_DATE: async (req,res)=>{
        try {
            const from = req.query.from;
            const to = req.query.to;
            let query ={};
            if(from && to){
                query.$and = [
                    {
                        createAt:{
                            $gte:from,
                        },
                    },
                    {
                        createAt:{
                            $lte:to,
                        },
                    },
                ]
            }

            const product = await ProductModel.find()
            const result = await ProductModel
                .aggregate(query,[
                    { $project: {  } },
                    // { $limit: 2 },
                    { $sort: { createAt: 1 } }
                ])

        } catch (e) {
            res.send({
                error:e.message
            })
        }
    },

    POST: async (req,res)=>{
        try {
            const newProduct = req.body;
            const product = await ProductModel.insertMany(newProduct);
            res.status(200).send({
                data:product
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
            const updateProduct = req.body;

            const foundProduct = await ProductModel.findById(id);
            if(!foundProduct) throw new Error("product not found");

            else if(!updateProduct.destription && !updateProduct.price)
            await ProductModel.updateOne({_id:id},{$set:{name:updateProduct.name}});

            else if(!updateProduct.destription && !updateProduct.name)
            await ProductModel.updateOne({_id:id},{$set:{price:updateProduct.price}});

            else if(!updateProduct.name && !updateProduct.price)
            await ProductModel.updateOne({_id:id},{$set:{destription:updateProduct.destription}});

            else{
                await ProductModel.updateOne({_id:id},{
                    $set:{
                        name:updateProduct.name,
                        price:updateProduct.price,
                        destription:updateProduct.destription,
                    }
                });
            }

            const found = await ProductModel.findById(id);
            res.status(200).send({
                data:found
            })
        } catch (e) {
            res.status(500).send({
                error:e.message
            })
        }
    },

    DELETE: async (req,res)=>{
        try {
            const id = req.query.id;
            const foundProduct = await ProductModel.findById(id)
            if(!foundProduct) throw new Error("Product not found");

            await ProductModel.findByIdAndDelete(id);
            res.status(200).send({
                message:" congratulations you are successfully delete product "
            })
        } catch (e) {
            res.status(500).send({
                error:e.message,
            })
        }
    }
}
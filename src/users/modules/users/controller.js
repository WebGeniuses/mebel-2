const { ProductModel } = require("../../../common/db/models/product.model");


module.exports = {
    GET_BY_PAGING: async (req,res)=>{
        try {
            const {page,limit} = req.query;

            const products = await ProductModel
            .find({},{
                name:1,
                destription:1,
                price:1
            })
            .skip(limit * (page - 1))
            .limit(limit)
            .sort({createdAt:1, updatedAt:1})
    
            const total = await ProductModel.countDocuments();

            res.send({
                total:total,
                data:products,
            })
        }catch (e) {
            console.log(e)
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
            const posts = await ProductModel.find(query,{
                name:1,
                destription:1,
                price:1,
                photoId:1,
            
               }).populate('photoId',{name:1,path:1});
                const total = await ProductModel.countDocuments(query);
    
                res.send({
                    total: total,
                    data:posts,
                });
                } catch (e) {
                    res.send({
                        error:e.message
                    })
                }
    },

    SEARCH: async (req,res)=>{
        
        try {

        const search = req.query.search;

        let query = {};
        if(search){

            query.$or = [
                {
                    destription:{
                        $regex:search,
                        $options:"i"
                    },
                },
                {
                    name:{
                        $regex:search,
                        $options:"i",
                    },
                },
            ]
             
        }
        const products = await ProductModel.find(query,{
             name:1,
             destription:1,
             photoId:1,
             price:1,
         
            }).populate('photoId',{name:1,path:1});
            const  total = await ProductModel.countDocuments(query);

            if(!products) throw new Error("product not found !!!");

        res.send({
            total: total,
            data:products,
        });
        } catch (e) {
            res.send({
                status:400,
                data:e
            })
        }
    },
}
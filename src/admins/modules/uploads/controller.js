const { PhotoModel } = require("../../../common/db/models/photo.model");
const { ProductModel } = require("../../../common/db/models/product.model");

module.exports = {
    GET:async (req,res)=>{
        try {
            const id = req.query.id;
        const foundProduct = await ProductModel.findById(id);
        if(!foundProduct) throw new Error("Product not found");

        const photo = req.file;
        let respons = await PhotoModel.create({
            path: photo.path,
            name:photo.orginalname,
        })

        await ProductModel.updateOne({_id:id},{$set:{photoId:respons._id}});

        res.status(200).send({
            data:respons
        })
        } catch (e) {
            res.send({
                error:e.message,
            })
        }
    }
}
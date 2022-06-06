const { AdminModel } = require("../../../common/db/models/admin.model")
const jwt = require("jsonwebtoken")
const {JWT} = require("../../../../config/config")


module.exports = {
    POST: async (req, res) => {
        try {
            const { userName, password } = req.body;
            const admin = await AdminModel.findOne({ userName })

            if (!admin || admin.password != password)
                throw new Error("Parol yoki userName xato")

            const token = jwt.sign({ userName }, JWT)

            await AdminModel.updateOne({userName:admin.userName},{$set:{token:token}})
            
            res.send({
                status: 200,
                token: token
            })
        } catch (e) {
            res.send({
                status: 401,
                error: e.message
            })

        }

    }
}
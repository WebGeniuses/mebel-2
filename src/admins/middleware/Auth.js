const { AdminModel } = require("../../common/db/models/admin.model")
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../../config/config");


async function auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) throw new Error("Avtorizatsiyadan otish kerak")

        let userName;

        await jwt.verify(token, JWT_KEY, (er, data) => {
            if (er) throw new Error(er.message)
            userName = data
        })

        const admin = await AdminModel.findOne({ userName })

        if (!admin) throw new Error("Admin topilmadi")

        // req.admin = admin
        next()

    } catch (e) {
        res.send({
            error: e.message,
        })
    }
}
module.exports = { auth };

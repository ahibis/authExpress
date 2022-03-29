const ApiError = require("../exeptions/api-error")
const Users = require("../models/user-model")

class ApiService{
    async getUserByToken(token){
        return await Users.findOne({where:{token}})
    }
}
module.exports = new ApiService()
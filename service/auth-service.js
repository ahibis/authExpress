const bcrypt = require("bcryptjs")
const ApiError = require("../exeptions/api-error")
const Users = require("../models/user-model")
class AuthService{
    async registraion(email, password, passwordConfirm){
        if(password!=passwordConfirm)
            throw ApiError.BadRequest("пароли не совпадают")
        if(password.length<5)
        throw ApiError.BadRequest("пароль должен содержать больше 5 символов")
        const candidates = await Users.findAll({
            where:{
                email
            }
        })
        if(candidates.length)
            throw ApiError.BadRequest("пользователь с данной почтой уже существует")
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt)
        const token = await bcrypt.hash(`${email}${~~(Math.random()*1000)}`,salt)
        const user = await Users.create({email,password,token})
        const {id} = user;
        return {status:"ok",id,email,token,message:"успешно авторизован"}
    }
    async auth(email,password){
        const candidate = await Users.findOne({
            where:{
                email
            }
        })
        if(!candidate)
            throw ApiError.BadRequest("Пользователь с данным email не найден")
        const {id,token} = candidate;
        if (!await bcrypt.compare(password,candidate.password))
            throw ApiError.BadRequest("не верный пароль")
        return {status:"ok",id,token,email,message:"успешно авторизован"}
    }
}
module.exports = new AuthService()
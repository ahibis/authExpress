const env = require('dotenv').config({})
process.env = {...process.env,...require('dotenv-parse-variables')(env.parsed)};
const express = require("express")
const bodyParser = require('body-parser');
const { registraion, auth } = require('./service/auth-service');
const apiErrorMiddleware = require("./middlewares/api-error-middleware")

const app = express();

app.set("view engine","ejs")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.post("/registration", async (req,res,next)=>{
    try{
        const {email, password, passwordConfirm} = req.body;
        const data = await registraion(email,password,passwordConfirm)
        res.json(data)
    }catch(e){
        next(e)
    }
})

app.post("/auth", async (req,res,next)=>{
    try{
        const {email, password} = req.body;
        const  data = await auth(email,password)
        res.json({ok:"ok"})
    }catch(e){
        next(e)
    }
})
app.use(apiErrorMiddleware)
app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(+process.env.port)
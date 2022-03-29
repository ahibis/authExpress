const env = require('dotenv').config({})
process.env = {...process.env,...require('dotenv-parse-variables')(env.parsed)};
const express = require("express")
const bodyParser = require('body-parser');
const { registraion, auth } = require('./service/auth-service');
const apiErrorMiddleware = require("./middlewares/api-error-middleware");
const unfindMiddleware = require("./middlewares/404-middleware")
const isAuth = require("./middlewares/isAuth-middleware")
const session = require('express-session');
const { getUserByToken } = require('./service/api-service');

const app = express();

app.set("view engine","ejs")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: process.env.sessionSecret,
    
}))
app.use(express.static("public"))


app.post("/registration", async (req,res,next)=>{
    try{
        const {email, password, passwordConfirm} = req.body;
        const Data = await registraion(email,password,passwordConfirm)
        req.session.userId = Data.id;
        req.session.email = email;
        res.json(Data)
    }catch(e){
        next(e)
    }
})

app.post("/auth", async (req,res,next)=>{
    try{
        const {email, password} = req.body;
        const  data = await auth(email,password)
        req.session.userId = data.id;
        req.session.email = email;
        req.session.save()
        res.json(data)
    }catch(e){
        next(e)
    }
})
app.get("/getUserByToken", async (req,res,next)=>{
    try{
        const {token} = req.body;
        const  data = await getUserByToken(token)
        res.json(data)
    }catch(e){
        next(e)
    }
})
app.use(apiErrorMiddleware)

app.get("/info",(req,res)=>{
    res.json({userId:req.session.userId})
})
app.get("/registration",(req,res)=>{
    res.render("registration")
})
app.get("/auth",(req,res)=>{
    res.render("auth")
})
app.get("/",(req,res)=>{
    res.redirect("/registration")
})
app.get("/logout",(req,res)=>{
    delete req.session.id
    res.send("успешно вышли") 
})
app.get("/v1/car",(req,res)=>{
    res.json(JSON.parse(`
    [{
        "id": 1,
        "model": "m3",
        "price": 10000000,
        "power": 500,
        "description": null,
        "brandName": "BMW"
    }, {
        "id": 2,
        "model": "m2 competition",
        "price": 100000000,
        "power": 1000,
        "description": null,
        "brandName": "BMW"
    }
]
`))
})
app.get("/car",(req,res)=>{
    res.render("car")
})

app.get("*",(req,res)=>{
    res.render("404")
})
app.listen(process.env.port)
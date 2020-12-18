const express=require("express")
const bodyparser=require("body-parser")
const cors=require("cors")


const empRt=require("./Routings/Router")
const app=express()


app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
 
app.use("/api/emp",empRt)

module.exports=app


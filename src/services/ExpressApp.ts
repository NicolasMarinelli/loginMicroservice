import express,{ Application } from "express"
import {AdminRoute} from "../routes"
import path from "path"



export default async (app: Application)=>{
   

    app.use(express.json());
    app.use(express.urlencoded({extended:true}))

    
    app.get("./",(req,res)=>{
        res.send("Hola Monudo")
    })
    app.use('/admin', AdminRoute)
      
    return app
}



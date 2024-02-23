import express from "express"
import App from "./services/ExpressApp"
import {pool} from "./services/Database"



const StartServer= async ()=>{

    const app= express() 

    await pool

    await App(app);

    app.listen(8000, ()=>{
        console.log("listening to port 8000")
    })

}

StartServer()
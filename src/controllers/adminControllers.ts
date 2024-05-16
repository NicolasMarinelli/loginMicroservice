import express, {Request,Response,NextFunction} from "express";
import {pool} from '../services/Database';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from "../utility/PasswordUtility";
import { CreateVandorInput, VandorLoginInputs } from "../dto/Vandor.dto";


export const signUpController = async (req:Request,res:Response,next:NextFunction )=>{
    const {username,email,password}= <CreateVandorInput> req.body
    const salt = await GenerateSalt()
    const gPassword= await GeneratePassword(password,salt)
    const values = [username, email, gPassword, salt];
    pool.query("INSERT INTO user (username,email,password,sal) VALUES (?,?,?,?)",values) 
    return res.json({message:"generated user"})
}

export const singinController =async (req:Request,res:Response,next:NextFunction )=>{
    const {username,password}= <VandorLoginInputs> req.body
    const rows= await pool.query("SELECT * FROM user WHERE username=? AND active=1",[username])
    const existingUser = JSON.parse(JSON.stringify(rows))[0]
    
    if(existingUser !==null){

        //validation and give access
        const validation = await ValidatePassword(password,existingUser.password,existingUser.sal)
        if(validation){

            const signature= GenerateSignature({
                _id:existingUser.id,
                email:existingUser.email,
                username: existingUser.name,
            })

            return res.json(signature)
        }else{
            return res.json({"message":"Password  not valid "})
        }
    }
    return res.json({"message":"login credetials not valid "})



    
   
}
import express, {Request,Response,NextFunction} from "express";
import {pool} from '../services/Database';
const router = express.Router()
import { signUpController, singinController } from "../controllers/adminControllers";
import { Authenticate } from "../middleware/CommonAuth";


router.post("/signUp",signUpController)
router.post("/signIn",singinController)


router.use(Authenticate)
router.get("/", async (req:Request, res: Response, next: NextFunction)=>{
    res.json({message:"hello from Admin"})
})

export { router as AdminRoute}
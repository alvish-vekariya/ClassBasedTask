import { Request, Response } from 'express';
import {userService} from '../services/userService'; 

const userServices: userService = new userService();


export const loginUser = async (req:Request, res:Response)=>{
    res.json(await userServices.login(req.body.username, req.body.password))
}

export const registerUser = async(req:Request, res:Response)=>{
    res.json( await userServices.register(req.body.username, req.body.password));
}

export const logoutUser = async(req:Request, res:Response)=>{
    res.json(await userServices.logout(req.body.username));
}
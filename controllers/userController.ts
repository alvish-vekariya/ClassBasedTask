import { Request, Response } from 'express';
import {userService} from '../services/userService'; 

const userServices: userService = new userService();


export const loginUser = async (req:Request, res:Response)=>{

    const username : string = req.body.username;
    const password : string = req.body.password;

    if(!username || !password) return res.status(404).json({404:"username and password are required!!"});

    res.json(await userServices.login(username, password))
}

export const registerUser = async(req:Request, res:Response)=>{

    const username : string = req.body.username;
    const password : string = req.body.password;

    if(!username || !password) return res.status(404).json({404:"username and password are required!!"});

    res.json( await userServices.register(username, password));
}

export const logoutUser = async(req:Request, res:Response)=>{

    const username : string = req.body.username;

    if(!username) return res.status(404).json({404 : "usename is required!!"});

    res.json(await userServices.logout(username));
}
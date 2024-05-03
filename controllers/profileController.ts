import { Request, Response } from 'express';
import {ProfileService} from '../services/profileService'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path :'../config/.env'});

const createprofService: ProfileService = new ProfileService();

export const createprofile = async (req:Request, res:Response)=>{

    const profileName: string = req.body.profileName;
    const token = req.header('token') as string;
    if(!profileName || !token) return res.status(404).json({404:"profileName and headers are required!!"});

    res.json(await createprofService.createProfile(profileName, token));
}

export const getAllprofiles = async (req:Request, res:Response)=>{

    const token = req.header('token') as string;

    res.json(await createprofService.getAllprofiles(token));
}

export const deleteProfile = async (req:Request, res:Response)=>{

    const profileID: string = req.body.profileID;

    if(!profileID) return res.status(404).json({404 : "profileID is required!!"});

    res.json(await createprofService.deleteProfile(profileID));
}

export const updateProfile = async (req:Request, res:Response)=>{

    const profileID: string = req.body.profileID;
    const updatedProfileName : string = req.body.updatedProfileName;

    if(!profileID || !updatedProfileName) return res.status(404).json({404 : "profileID and updatedProfileName are required!!"});

    res.json(await createprofService.updateProfile(profileID, updatedProfileName));
}

export const getpdf = async (req: Request, res: Response)=>{
    const profileID: string = req.body.profileID;
    const token = req.header('token') as string;

    const tokenData = jwt.verify(token,process.env.SECRETE_KEY as string) as jwt.JwtPayload;
    const userID: string = tokenData.userID;

    if(!profileID) return res.status(404).json({404: "profileID is required!!"});

    res.json(await createprofService.getPDF(profileID,userID));
}

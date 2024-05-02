import { Request, Response } from 'express';
import {ProfileService} from '../services/profileService'; 

const createprofService: ProfileService = new ProfileService();

export const createprofile = async (req:Request, res:Response)=>{
    res.json(await createprofService.createProfile(req.body.profileName, req.header('token') as string));
}

export const getAllprofiles = async (req:Request, res:Response)=>{
    res.json(await createprofService.getAllprofiles(req.header('token') as string));
}

export const deleteProfile = async (req:Request, res:Response)=>{
    res.json(await createprofService.deleteProfile(req.body.profileID));
}

export const updateProfile = async (req:Request, res:Response)=>{
    res.json(await createprofService.updateProfile(req.body.profileID, req.body.updatedProfileName));
}


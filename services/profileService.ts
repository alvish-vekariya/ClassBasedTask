import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'../config/.env'});
import jwt, { Jwt } from 'jsonwebtoken';
import { profileModel } from '../models/profilesModel';
import mongoose, { Mongoose } from 'mongoose';
import { userModel } from '../models/userModel';

export class ProfileService{
    async createProfile(profileName : string, token : string):Promise<object>{
        // const profileName: string = req.body.profileName;
        if(profileName.trim() == "") return {404 : 'profilename is Required!!'};
        // const token = req.header('token') as string;
        const tokenData = jwt.verify(token, process.env.SECRETE_KEY as string) as jwt.JwtPayload;
        const user_id = new mongoose.Types.ObjectId(tokenData.userID);
        try{
            const data = await userModel.aggregate([
                {
                    $match : {_id : user_id}
                },
                {
                    $lookup : {
                        from : "profiles",
                        localField : "_id",
                        foreignField : "userID",
                        as : "profile"
                    }
                },
                {
                    $project : {
                        "profile.profileName" : 1
                    }
                },{
                    $group : {
                        "_id" : "$_id",
                        "profile" : {$push : "$profile.profileName"}
                    }
                }
            ])
            // console.log(data[0].profile[0]);

            const user_profiles = data[0].profile[0];

            const checkDuplicate = user_profiles.indexOf(profileName);
            // console.log(checkDuplicate);
            if(checkDuplicate == -1){
                await profileModel.create({
                    profileName : profileName,
                    userID : tokenData.userID
                })
                return {200 : 'Profile Created!!'};
            }else{
                return {409 : "profile is already exists!!"};
            }
        }catch(err:any){
            return {500 : err.message};
        }
    }

    async updateProfile(profileID: string, updatedProfileName: string):Promise<object>{
        try{
            await profileModel.updateOne({_id:profileID},{$set : {"profileName" : updatedProfileName}});
            return {200: "profile updated!!"};
        }catch(err:any){
            return {500: err.message}
        }
    }

    async getAllprofiles(token:string):Promise<object[]>{
        try{
            const tokendata = await jwt.verify(token, process.env.SECRETE_KEY as string) as jwt.JwtPayload;
            const allProfiles = await profileModel.find({userID:tokendata.userID}) 
            return allProfiles;
        }catch(err:any){
            return [{500 : err.message}]
        }
    }

    async deleteProfile(profileID: string):Promise<object>{
        try{
            await profileModel.deleteOne({_id:profileID});
            return {200 : 'profile deleted successfully!!'}
        }catch(err: any){
            return {500 : err.message};
        }
    }
}
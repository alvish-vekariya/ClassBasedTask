import express, { Express, NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });
import { userModel } from '../models/userModel';
import { profileModel } from '../models/profilesModel';
import mongoose from "mongoose";

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileID: string = req.body.profileID;
        const profile_id = new mongoose.Types.ObjectId(profileID);

        const token = req.header('token');

        if (token) {
            const checkToken = jwt.verify(token, process.env.SECRETE_KEY as string) as jwt.JwtPayload;
            if (checkToken) {
                const checktoken_userID = checkToken.userID;
                // console.log(checktoken_userID);
                const data = await userModel.findOne({_id:checktoken_userID, token: {$exists : true}});
                if(data){
                    if (profileID) {
                    
                        const user_id = new mongoose.Types.ObjectId(checkToken.userID);
    
                        const data = await userModel.aggregate([
                            {
                                $match: {_id : user_id}
                            },
                            {
                                $lookup: {
                                    from: "profiles",
                                    localField: "_id",
                                    foreignField: "userID",
                                    as: "profile"
                                }
                            },
                            {
                                $unwind : "$profile"
                            },{
                                $group : {
                                    _id : null,
                                    profiles : {$push : "$profile._id"}
                                }
                            }
                        ]);
                        
                        // console.log(data[0].profiles);
                        const profiles = data[0].profiles;
                        let isavailable: boolean = false;
    
                        for(let x of profiles){
                            if(x.toString() === profile_id.toString()){
                                isavailable = true;
                            }
                        }
                        
                        if(isavailable){
                            next();
                        }else{
                            res.status(404).json({404: "user doesn't have this profile!!"});
                        }
                    }else{
                        next();
                    }
                }else{
                    res.status(409).json({409:"your are not logged in!!"});
                }
            } else {
                res.status(401).send('Login Required!!');
            }
        } else {
            return res.status(404).json({ 404: "token is not set!!" });
        }


    } catch (err: any) {
        if (err instanceof JsonWebTokenError) {
            res.status(401).send("you need to login again!!");
        } else {
            res.status(500).send(err.message);
        }
    }
}
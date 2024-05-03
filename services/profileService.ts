import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'../config/.env'});
import jwt, { Jwt } from 'jsonwebtoken';
import { profileModel } from '../models/profilesModel';
import mongoose, { Mongoose, Document } from 'mongoose';
import { userModel } from '../models/userModel';
import { cartModel } from '../models/cartModel';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { cartInterface, productInterface, profileInterface, userInterface } from '../constants/interfaces';
import { productModel } from '../models/productModel';

export class ProfileService{
    async createProfile(profileName : string, token : string):Promise<object>{
        // const profileName: string = req.body.profileName;
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
            return {200: "profile updated!!" };
        }catch(err:any){
            return {500: err.message}
        }
    }

    async getAllprofiles(token:string):Promise<object[]>{
        try{
            const tokendata = jwt.verify(token, process.env.SECRETE_KEY as string) as jwt.JwtPayload;
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

    async getPDF(profileID: string, userID: string):Promise<object>{
        try{
            
            const user_id = new mongoose.Types.ObjectId(userID);
            const profile_id = new mongoose.Types.ObjectId(profileID);
            
            const data:cartInterface[] = await cartModel.find({profileID:profile_id}).populate({path : "profileID"}).populate({path:"productID"});
            const user: userInterface = await userModel.findOne<userInterface>({_id:user_id}) as userInterface;
            const username = user.username;
            // console.log(username);

            const temp :profileInterface= data[0].profileID as profileInterface;
            const profileName: string = temp.profileName as string;
            const doc = new PDFDocument();
            const writestream = fs.createWriteStream(path.join(__dirname , '..', 'cartPDFs', `${username}'s ${profileName}'s cart.pdf`)); 
            doc.pipe(writestream);

            doc.fontSize(20).text(`Username : ${username}`);
            doc.fontSize(18).text(`Profile Name : ${profileName}`);
            doc.moveDown();
            doc.fontSize(13).text("Sr. no.",70,150);
            doc.text("Product Name",150,150);
            doc.text('Price',300,150);
            doc.text('Quantity',380,150);
            doc.text('Total',500,150);
            
            let yposition: number = 170;
            let totalsum : number = 0 ;
            
            data.forEach(async (element, index) => {
                doc.fontSize(12).text(`${index+1}`,70, yposition);
                const product: any= element.productID ;
                // console.log();
                doc.text(`${product.productName as string}`,150,yposition);
                doc.text(`${product.price}`, 300, yposition);  
                doc.text(`${element.quantity}`,380,yposition);
                doc.text(`${element.total}`,500, yposition);   
                totalsum += element.total; 
                yposition+=20;   
            });
            doc.text('___________________',400);
            doc.fontSize(16).text(`Total : ${totalsum}`, 400, yposition+20)

            doc.end();

            return {200: 'PDF created successfully!!'};
        }catch(err: any){
            return {500 : err.message}
        }
    }
}
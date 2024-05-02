
import { userModel } from "../models/userModel";
import { userInterface } from "../constants/interfaces";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path:'../config/.env'})

export class userService {
    async login(username:string, password:string):Promise<object>{

        try{
            const foundUser= await userModel.findOne<userInterface>({username : username});
            if(foundUser){
                const validUser : boolean= await bcrypt.compare(password, foundUser.password);
                if(validUser){
                    const data = {
                        userID : foundUser.id,
                        loginTime : new Date()
                    }

                    const token: string = jwt.sign(data, process.env.SECRETE_KEY as string,{expiresIn : "30s"});
                    // console.log(foundUser.id);
                    await userModel.updateOne({_id:foundUser.id},{$set : {token : token}});
                    return {message :'User logged in !!', token:token}
                }else{
                    return {404 : 'unautorized'};
                }
            }else{
                return {404:'user not found!'}
            }
        }catch(err:any){
            return {500 : err.message};
        }
    }

    async register(username:string, password:string):Promise<object>{
        
        try{
            await userModel.create({
                username: username,
                password: password
            })
            return {200 :'User Created!!'};
        }catch(err:any){
            return {500 : err.message};
        }
    }

    async logout(username:string):Promise<object>{
        try{
            await userModel.updateOne({username: username},{$unset : {token : {$exists :true}}});
            return {200 : 'user logout!'};
        }catch(err:any){
            return {500 : err.message}
        }
    }
}

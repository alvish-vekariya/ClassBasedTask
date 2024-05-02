import mongoose, { Model, Models } from "mongoose";
import { userInterface } from "../constants/interfaces";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<userInterface>({
    username: {
        type: String,
        required: [true, 'username is required!'],
        unique : [true, 'username must be unique!']
    }, 
    password : {
        type : String,
        required : [true, "password is required!"]
    },
    token : {
        type: String
    }
})

userSchema.pre('save',async function(next){
    try{
        const hashpassword : string = await bcrypt.hash(this.password, 10);
        this.password = hashpassword ;
        next();
    }catch(err:any){
        next(err)
    }
})

export const userModel = mongoose.model<userInterface>('users',userSchema);
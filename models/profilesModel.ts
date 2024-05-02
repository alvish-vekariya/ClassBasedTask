import mongoose, { Model } from "mongoose";
import {profileInterface} from '../constants/interfaces';

const profileSchema = new mongoose.Schema<profileInterface>({
    profileName :{
        type: String,
        required : [true,"profileName is Required!!"]
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users"
    }
})

export const profileModel = mongoose.model<profileInterface>('profiles', profileSchema);
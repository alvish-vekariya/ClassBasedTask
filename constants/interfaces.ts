import mongoose from "mongoose"

export interface userInterface{
    id?: mongoose.Types.ObjectId,
    username : string | undefined,
    password: string,
    token : string
}

export interface profileInterface{
    id?: mongoose.Types.ObjectId,
    profileName : string | undefined,
    userID: mongoose.Types.ObjectId
}

export interface cartInterface{
    id?: mongoose.Types.ObjectId,
    profileID: mongoose.Types.ObjectId,
    productID: mongoose.Types.ObjectId,
    quantity : number,
    total : number,
    createdAt?: Date,
    updateAt?: Date
}

export interface productInterface{
    id?: mongoose.Types.ObjectId,
    productName: string | undefined,
    price: number
}
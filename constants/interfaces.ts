import mongoose from "mongoose"

export interface userInterface{
    id?: mongoose.Types.ObjectId,
    username : string | undefined,
    password: string,
    token : string
}

export interface profileInterface{
    _id?: mongoose.Schema.Types.ObjectId,
    profileName : string | undefined,
    userID: mongoose.Schema.Types.ObjectId,
    __v ?: number
}

export interface cartInterface{
    id?: mongoose.Types.ObjectId,
    profileID: mongoose.Types.ObjectId | profileInterface,
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
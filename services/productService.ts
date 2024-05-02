import express, {Request, Response} from "express";
import { productModel } from "../models/productModel";
import mongoose from "mongoose";
import { productInterface } from "../constants/interfaces";


export class productService{
    async addproduct(productName: string, price:number):Promise<object>{

        try{
            await productModel.create({
                productName : productName,
                price : price
            })
            return {201:'product added successfully!!'};
        }catch(err: any){
            return {500 : err.message};
        }
    }

    async updateProduct(productID:mongoose.Types.ObjectId, updatedName: string, updatedPrice: number):Promise<object>{
        // const productID: mongoose.Types.ObjectId = req.body.productID;
        // const updatedName : string = req.body.updatedName;
        // const updatedPrice : number = req.body.updatedPrice;

        try{
            await productModel.updateOne({_id:productID},{$set:{
                productName : updatedName,
                price : updatedPrice
            }})
            return {200: 'product updated successfully!!'};
        }catch(err: any){
            return {500 : err.message};
        }
    }

    async deleteProduct(productID : mongoose.Types.ObjectId):Promise<object>{
        // const productID  = req.body.productID;

        try{
            await productModel.deleteOne({_id:productID});
            return {200 : 'Product is Deleted!!'};
        }catch(err: any){
            return {500 : err.message};
        }
    }

    async getAllProducts():Promise<object[]>{
        try{
            const allProducts = await productModel.find<productInterface>({});
            return allProducts;
        }catch(err: any){
            return [{500 : err.message}];
        }
    }
}
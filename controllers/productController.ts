import express, { Express, Request, Response } from "express";
import {productService} from '../services/productService';
import { productInterface } from "../constants/interfaces";

const productservice: productService = new productService();

export const addproduct = async (req:Request, res:Response)=>{
    const productName: string = req.body.productName;
    const price: number = req.body.price;

    if(!productName || !price) return res.status(404).json({404 : "productName and price are required!!"});

    res.json(await productservice.addproduct(productName, price));
}

export const deleteproduct = async (req: Request, res: Response)=>{

    const productID: string = req.body.productID;

    if(!productID) return res.status(404).json({404:"productID is required!!"});

    res.json(await productservice.deleteProduct(productID));
}

export const updateproduct = async (req: Request, res: Response)=>{

    const productID : string = req.body.productID;
    const updatedName :string = req.body.updatedName;
    const updatedPrice : number =  req.body.updatedPrice;

    if(!productID || !updatedPrice || !updatedName) return res.status(404).json({404 : "productID, updatedName, updatedPrice are required!!"});

    res.json(await productservice.updateProduct(productID, updatedName, updatedPrice));
}

export const getAllProducts = async (req:Request, res: Response)=>{

    res.json(await productservice.getAllProducts());
}
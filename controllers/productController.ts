import express, { Express, Request, Response } from "express";
import {productService} from '../services/productService';
import { productInterface } from "../constants/interfaces";

const productservice: productService = new productService();

export const addproduct = async (req:Request, res:Response)=>{
    res.json(await productservice.addproduct(req.body.productName, req.body.price));
}

export const deleteproduct = async (req: Request, res: Response)=>{
    res.json(await productservice.deleteProduct(req.body.productID));
}

export const updateproduct = async (req: Request, res: Response)=>{
    res.json(await productservice.updateProduct(req.body.productID, req.body.updatedName, req.body.updatedPrice));
}

export const getAllProducts = async (req:Request, res: Response)=>{
    res.json(await productservice.getAllProducts());
}
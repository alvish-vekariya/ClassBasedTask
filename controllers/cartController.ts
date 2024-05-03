import express, { Express, Request, Response } from "express";
import {cartService} from '../services/cartService';

const cartservice : cartService = new cartService();

export const addtocart = async (req:Request, res: Response)=>{
    const profileID: string = req.body.profileID;
    const productID : string = req.body.productID;
    const quantity : number = req.body.quantity;
    
    if(!profileID || !productID || !quantity){
        res.status(404).json({404: "profileID, productID & quantity are required!!"});  
    } else{
        res.json(await cartservice.addtoCart(profileID, productID, quantity));
    }
}

export const updateCart = async (req:Request, res: Response)=>{
    const cartID : string = req.body.cartID;
    const updatedProductID: string = req.body.updatedProductID;
    const updatedQuantity: number = req.body.updatedQuantity;

    if(!cartID || !updatedProductID || !updatedQuantity) return res.status(404).json({404 : "cartID, updatedProductID, updatedQuantity are required!!"});

    res.json(await cartservice.updateCart(cartID, updatedProductID, updatedQuantity));
}

export const deleteCart = async (req:Request, res: Response)=>{

    const cartID: string = req.body.cartID;

    if(!cartID) return res.status(404).json({404:"cartID is required!!"});

    res.json(await cartservice.deleteCart(cartID));
}

export const getAllCart = async (req:Request, res: Response)=>{

    const profileID: string = req.body.profileID;

    if(!profileID) return res.status(404).json({404 : "profileID is required!!"});

    res.json(await cartservice.getAllCart(profileID));
}
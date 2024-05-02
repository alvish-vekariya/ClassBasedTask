import express, { Express, Request, Response } from "express";
import {cartService} from '../services/cartService';

const cartservice : cartService = new cartService();

export const addtocart = async (req:Request, res: Response)=>{
    res.json(await cartservice.addtoCart(req.body.profileID, req.body.productID, req.body.quantity));
}

export const updateCart = async (req:Request, res: Response)=>{
    res.json(await cartservice.updateCart(req.body.cartID, req.body.updatedProductID, req.body.updatedQuantity));
}

export const deleteCart = async (req:Request, res: Response)=>{
    res.json(await cartservice.deleteCart(req.body.cartID));
}

export const getAllCart = async (req:Request, res: Response)=>{
    res.json(await cartservice.getAllCart(req.body.profileID));
}
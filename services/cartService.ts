import { Express } from "express";
import mongoose from "mongoose";
import { cartModel } from "../models/cartModel";
import { cartInterface } from "../constants/interfaces";

export class cartService {
    async addtoCart(profileID: string, productID: string, quantity:number): Promise<object> {
        try {
            await cartModel.create({
                productID: productID,
                profileID: profileID,
                quantity: quantity
            })
            return { 200: 'Product Added!!' };
        } catch (err: any) {
            return { 500: err.message };
        }
    }

    async updateCart(cartID: string, updatedProductID: string, updatedQuantity: number): Promise<object> {
        try {
            await cartModel.updateOne({ _id: cartID }, {
                $set: {
                    productID: updatedProductID,
                    quantity: updatedQuantity
                }
            });
            return { 200: 'Cart Updated Successfully!' };
        } catch (err: any) {
            return { 500: err.message };
        }
    }

    async deleteCart(cartID:string): Promise<object> {
        try {
            await cartModel.deleteOne({ _id: cartID });
            return { 200: 'cart deleted successfully!!' }
        } catch (err: any) {
            return { 500: err.message };
        }
    }

    async getAllCart(profileID:string): Promise<cartInterface[]> {
        try {
            const allCart = await cartModel.find<cartInterface>();
            return allCart;
        } catch (err: any) {
            return err.message;
        }
    }
}
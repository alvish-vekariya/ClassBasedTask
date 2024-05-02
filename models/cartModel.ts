import mongoose, { Model } from "mongoose";
import { cartInterface } from "../constants/interfaces";
import { productModel } from "./productModel";

const cartSchema = new mongoose.Schema<cartInterface>({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'productID is required!'],
        ref : "products"
    },
    profileID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'profileID is required!'],
        ref: "profiles"
    },
    quantity: {
        type: Number,
        min: [1, 'minimum ! item required!'],
        required: true
    },
    total: {
        type: Number
    },
})

cartSchema.pre('save', async function (next) {
    const foundItem = await productModel.findOne({ id: this.productID });
    if (foundItem) {
        try {
            const price = foundItem.price;
            this.total = this.quantity * price;
            next();
        } catch (err: any) {
            next(err);
        }
    }
    else{
        next(new Error('Product is not found!'));
    }
})

export const cartModel : Model<cartInterface> = mongoose.model('carts', cartSchema); 
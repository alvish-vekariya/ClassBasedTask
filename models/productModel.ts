import mongoose, { Model } from "mongoose";
import {productInterface} from '../constants/interfaces';


const productSchema = new mongoose.Schema<productInterface>({
    productName: {
        type: String,
        required : [true, 'Product name is required!!'],
        unique : [true, 'Product is alreay exists!']
    },
    price: {
        type : Number,
        required : [true, 'price is required!!'],
        min : 1
    }
})

export const productModel : Model<productInterface> = mongoose.model('products', productSchema);
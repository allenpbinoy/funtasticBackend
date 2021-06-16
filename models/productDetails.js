
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    pname: String,
    description: String,
    //creator: String,
    categories: String,
    image: String,
    imageId: String,
    //selectedFile: String,
    price:Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

 export const ProductDetails = mongoose.model('ProductDetails', productSchema);

const recentSchema = mongoose.Schema({
    pname: String,
    description: String,
    //creator: String,
    categories: String,
    image: String,
    imageId: String,
    //selectedFile: String,
    price:Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export const  RecentProducts = mongoose.model('RecentProducts', recentSchema);


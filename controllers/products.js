import { name } from 'ci-info';
import express from 'express';
import mongoose from 'mongoose';

import{ProductDetails, RecentProducts} from '../models/productDetails.js';

const router = express.Router();

export const getProducts = async (req, res) => { 
    try {
        var mysort = { pname: 1 };


        const productDetails = await ProductDetails.find().sort(mysort);
                

        res.status(200).json(productDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await ProductDetails.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    const { pname, description,  price, categories,image,imageId,createdAt } = req.body;

    const newProductDetail= new ProductDetails({  pname, description,  price, categories,image,imageId,createdAt })

    try {
        await newProductDetail.save();

        res.status(201).json(newProductDetail );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { pname, description,  price, categories,image,imageId,createdAt } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    const updatedProduct = { pname, description,  price, categories,image,imageId,createdAt, _id: id };

    await ProductDetails.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await ProductDetails.findByIdAndRemove(id);

    res.json({ message: "Product deleted successfully." });
}


export const categoryProduct = async (req, res) => { 
    const { id } = req.params;

 try {
    const filters = req.query;
    console.log(filters)
    /*const filteredUsers = await ProductDetails.filter(user => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];

      }
      return isValid;
    });
    res.send(filteredUsers);*/var query = filters;   
    var mysort = { pname: 1 };
    const productDetails = await ProductDetails.find(query).sort(mysort);
             
   // var filtered = productDetails.findOne();
        res.status(200).json(productDetails);

   } catch (error) {
       res.status(404).json({ message: error.message });
   }

}

export const searchProduct = async (req, res) => { 
    const { id } = req.params;

 try {
    const filters = req.query.pname;

    const querypattern = {
        pname: {
            $regex: req.query.pname,
         
        }
    };
    console.log(querypattern)
    var query = querypattern;   
    

    const productDetails = await ProductDetails.find(query);
    res.status(200).json(productDetails);

   } catch (error) {
       res.status(404).json({ message: error.message });
   }

}

//Recent

export const createRecent = async (req, res) => {
    const { pname, description,  price, categories,image,imageId,createdAt, itemId } = req.body;

    const newRecent= new RecentProducts({  pname, description,  price, categories,image,imageId,createdAt,itemId })

    try {
        await newRecent.save();

        res.status(201).json(newRecent );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getRecent = async (req, res) => { 
    try {
        var mysort = { pname: 1 };


        const newRecent = await RecentProducts.find().sort(mysort);

                

        res.status(200).json(newRecent);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deleteRecent = async (req, res) => {

    await RecentProducts.remove();

    res.json({ message: "Product deleted successfully." });
}









export default router;
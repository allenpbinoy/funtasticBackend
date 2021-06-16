
import express from 'express';

import { getProducts,
         getProduct,
         createProduct, 
         updateProduct, 
         deleteProduct,
         categoryProduct,
         searchProduct,
         createRecent,
         getRecent,
         deleteRecent} from '../controllers/products.js';

const router = express.Router();
 
router.get('/', getProducts);
router.post('/', createProduct);
router.get('/item/:id', getProduct);
router.patch('/item/:id',updateProduct);
router.delete('/item/:id', deleteProduct);
router.get('/categories', categoryProduct);
router.get('/search', searchProduct);
router.post('/recent', createRecent);
router.get('/recent',getRecent);
router.delete('/recent',deleteRecent)

export default router;
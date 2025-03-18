import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, getCategories, getFilteredProducts } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import { verifyAdmin } from '../middleware/adminauthMiddleware.js';
import { verifySeller } from '../middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/add',verifySeller,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',verifySeller,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);
productRouter.get('/categories',getCategories);
productRouter.get('/filters',getFilteredProducts);


export default productRouter
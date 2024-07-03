

import express from 'express';
import ProductController from './product.controller.js';
import { uploadFile } from '../../middlewares/file.upload.middleware.js';
const ProductRouter = express.Router();

const productController = new ProductController();
// All the paths to controllers methods

ProductRouter.get('/filter',(req,res) => {
    productController.filterProducts(req,res)
});
ProductRouter.post('/rate',(req,res) => {
    productController.rateProduct(req,res)
}
);


ProductRouter.get("/", (req,res) => {
    productController.getAllProducts(req,res)
});


ProductRouter.post("/",
   
    (req,res) => {
        productController.addProduct(req,res)
    });
    
ProductRouter.get("/avgPrice", (req,res,next) => {
    productController.averageProduct(req,res)
})


ProductRouter.get("/:id", (req,res) => {
    productController.getOneProduct(req,res)
});








export default ProductRouter;



//localhost:8000/api/products/filter?minPrice=10&maxprice=20&category=Category1
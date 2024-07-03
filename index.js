import dotenv from 'dotenv';
//load all the environment variables in application
dotenv.config();


import express from 'express';
import ProductRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import basicAuthorizer from './src/middlewares/basic.auth.middleware.js';

import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';
import {connectToMongoDb} from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.routes.js';

const port = 8000;

const server = express();



server.use(express.static('./public'));

server.use(bodyParser.json());
//server.use(express.static('./uploads'))
//server.use('/api/products',basicAuthorizer,  ProductRouter);
server.use('/api/products',jwtAuth,ProductRouter);
server.use('/api/users',userRouter);
server.use('/api/cart',jwtAuth,cartRouter);
server.use('/api/order',jwtAuth, orderRouter);

server.use(express.urlencoded({ extended: true }));
server.get('/',(req,res) => {
    res.send("Welcome to E-commerce application")
});



server.listen(port,() => {
    console.log("Port connected successfully");
    connectToMongoDb();
});

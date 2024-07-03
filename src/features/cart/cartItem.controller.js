

import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import CartItemModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";
export default class CartController{

    constructor(){
        this.cartRepository = new CartRepository()
    }

    async add(req,res){

        try{

        console.log(req.query);

        const { productId, quantity} = req.query;
         

        // use jwt middleware to get the userId

        const userId = req.userId;
        console.log(userId);

        //CartItemModel.addItemsCart(productId,userId,quantity);

        await this.cartRepository.add(new ObjectId(productId),new ObjectId(userId),parseFloat(quantity))

        res.status(201).send("Cart is updated");
        }
        catch(err){
            console.log("Something went wrong",err)
            return 
        }



    }

    async get(req,res){

        try{

        const userId = req.userId;
        //const items = CartItemModel.getCartItems(userId);

        const items = await this.cartRepository.get(userId);
        

        return res.status(200).send(items);
        }
        catch(err){
            console.log("Something went wrong",err)
            return 
        }

    }

    async delete(req,res){

        try{

        const userId = req.userId;
        const cartItemId = req.params.id;

        //const error = CartItemModel.deleteItem(cartItemId,userId);

        const isDeleted =  await this.cartRepository.delete(
            userId,
            cartItemId
        )

        if(!isDeleted){
            return res.status(400).send("Invalid items")
        }else{
            return res.status(200).send("cart item is removed")
        }


    }catch(err){

        console.log("Something went wrong",err)
        return

    }
}


}
import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js"
import OrderModel from "./order.model.js";

export default class OrderRepository{

    constructor(){
        this.collection = "orders"
    }


    async placeOrder(userId){

        try{
        
        const client = getClient();
        const session = client.startSession();

        const db = getDB();
        //session.startTransaction();

        

        //1. Get the cartitems and calculate tot amount
         const items = await this.getTotalAmount(userId, session);
         const finalAmount = await items.reduce((acc,item) => acc + item.totalAmount)
         console.log(finalAmount.totalAmount)
        //2. Create an order record.

        const newOrder  = new OrderModel(new ObjectId(userId), finalAmount, new Date())
        await db.collection(this.collection).insertOne(newOrder, {session})

        //3. Reduce the stock.

        for(let item of items){
            await db.collection("products").updateOne(
                {
                    _id : item.productID
                },
                {
                    $inc : {stock : -item.quantity}
                },{session}
            )
        }

        
        //throw new Error("Something is wrong in place order")
        //4. Clear the cart items
        await db.collection("cartItems").deleteMany(
            {
                userID : new ObjectId(userId)
            },{session}
        );
        return;
        }
        catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            console.log("Something went wrong");
            return 
        }


    }


    async getTotalAmount(userId, session){

        const db = getDB();
        console.log(userId);



        const items = await db.collection("cartItems").aggregate([
            //1. get cart items for the user
            {
                $match : {userID : new ObjectId(userId)}
            },
            //2. Get the products from products collection

            {
                $lookup:{
                    from : "products",
                    localField : "productID",
                    foreignField : '_id',
                    as : "productInfo"

                }
            },
            //3. unwind the product info
            {
                $unwind : "$productInfo"
            },

            // 4.calculate the totamount for each cart items

            {
               $addFields :{
                "totalAmount" : {
                    $multiply : ["$productInfo.price","$quantity"]
                }
               }
            }

        ], {session}).toArray();
        //console.log(items);
        session.commitTranscation();
        session.endSession();

        return items;
        

    }

    




}
import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/mongodb.js"


export default class CartRepository{

    constructor(){
        this.collection = "cartItems"
    }





    async add(productID, userID, quantity){

        try{

        const db = getDB();

        const collection = db.collection(this.collection);
        const id = await this.getNextCounter(db);
        console.log(id);

        //find the document
        // insert or update

       




        await collection.updateOne({productID, userID},
            
            {   
                $setOnInsert : {_id : id},

                $inc : {
                    quantity : quantity
                }
            },
            {upsert : true}
        );


        }
        catch(err){
            console.log("Error with database", err);
            return 
        }



    }

    async get(userID){

        try{

            const db = getDB();

            const collection = db.collection(this.collection);

            

            return await collection.find({userID : userID}).toArray()

        }
        catch(err){
            console.log("Error with database");
            return 
        }

    }

    async delete(userID, productID){

        try{

            const db = getDB();
            const collection = db.collection(this.collection);

            const result = await collection.deleteOne({userID : userID , productID : productID});

            return result.deletedCount > 0;



        }
        catch(err){
            console.log("Error with database");
            return 

        }

    }


    async getNextCounter(db){
        
        const resultDocument = await db.collection('counters').findOneAndUpdate(
            {_id : 'cartItemId'},
            {$inc : {value : 1}},
            {returnDocument : 'after'}
        )

        console.log(resultDocument);
        return resultDocument.value

    }



}
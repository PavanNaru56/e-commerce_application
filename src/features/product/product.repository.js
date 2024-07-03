
import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ProductRepository{

    constructor(){

        this.collection = "products";
    }





    async add(newProduct){

        try{

            const db = getDB();
            const collection =  db.collection(this.collection);

            await collection.insertOne(newProduct)

            return newProduct;

        }
        catch(err){
            console.log("Error in Database", err);
            return 
        }

    }

    async getAll(){

        try{

            const db = getDB();
            const collection = db.collection(this.collection);

            const products = await collection.find().toArray();

            return products;



        }catch(err){

            console.log("Error in Database", err);
            return 

        }
        
    }

    async getOne(id){

        try{

            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id : new  ObjectId(id)})



        }
        catch(err){

            console.log("Error in Database", err);
            return 


        }


    }


    async filterProduct(minPrice, maxPrice, categories){

        try{

            const db = getDB();
            const collection = db.collection(this.collection);

            let filterExpression  = {};

            if(minPrice){
                filterExpression.price = {$gte : parseFloat(minPrice)}
            }

            // if(maxPrice){
            //     filterExpression.price = {...filterExpression.price, $lte : parseFloat(maxPrice)}
            // }

            if(categories){
               filterExpression = {$or : [{category : {$in : categories}}, filterExpression]}
            }

            const products = await collection.find(filterExpression).project({name : 1, price : 1, _id : 0, ratings : {$slice : 1} }).toArray();
            console.log(products);
            return products;





            
        }
        catch(err){

            console.log("Error in Database", err);
            return 


        }






    }


    


    // async rate(userID, productID, rating){

    //     try{

    //         const db = getDB();
    //         const collection = db.collection(this.collection);


    //         //1. Find the product

    //         const product = await collection.findOne({ _id : new ObjectId(productID)});

    //         //2. find the rating

    //         const userRating = product?.ratings?.find(r => r.userID == userID);


    //         if(userRating){

    //             // 3. Update the rating

    //             await collection.updateOne({
    //                 _id : new ObjectId(productID), "ratings.userID" : new ObjectId(userID)
    //             },{
    //                 $set : {
    //                     "ratings.$.rating" : rating
    //                 }
    //             })

    //         }else{

    //             await collection.updateOne({
    //                 _id : new ObjectId(productID)
    //             },
    //             {
    //                 $push : {ratings : {userID, rating}}
    //             }
    //         )
                
    //         }

            





    //     }
    //     catch(err){

    //         console.log("Error in Database", err);
    //         return "Something went wrong"


    //     }



    // }


    async rate(userID, productID, rating){

        try{

            const db = getDB();
            const collection = db.collection(this.collection);

            //1.Removes existing entry

            await collection.updateOne({
                _id : new ObjectId(productID)
            },{
                $pull : {ratings : {userID : new ObjectId(userID)}}
            });

            // 2. Add new Entry

            await collection.updateOne({
                _id : new ObjectId(productID)
            },{
                $push : {ratings : {userID : new ObjectId(userID), rating}}
            });


            //these pull and push operations are atomic operations means
            // either executes both or not 



        }
        catch(err){
            console.log("Error in Database", err);
            return
        }




    }

    // Aggregation

    async averageProductPrice(){

        try{

        const db = getDB();

        return await db.collection(this.collection)
           .aggregate([
            {
                //Stage 1 : get avg price per category

                $group : {
                    _id : "$category",
                    averagePrice : {$avg : "$price"}
                }
            }
           ]).toArray()
        


        }
        catch(err){
            console.log("Error in Database", err);
            return
        }

    }










}

export default ProductRepository;
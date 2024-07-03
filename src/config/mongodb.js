import { MongoClient } from "mongodb";

//const url = process.env.DB_URL;

let client;
export const connectToMongoDb = () => {

    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance => {
        
        client = clientInstance;
        console.log("MongoDb successfully connected");
        createCounter(client.db());
        createIndexes(client.db())
    })
    .catch(err => {
        console.log("Error while connecting to the mongoDB");
    })
}

export const getClient = () => {
    return client
}



export const getDB = () => {
    return client.db();
}

//export default connectToMongoDb;

// For modifying of the id


const createCounter = async (db) => {
    const existingCounter = await db.collection("counters").findOne({_id : 'cartItemId'});

    if(!existingCounter){
        await db.collection("counters").insertOne({_id : 'cartItemId', value : 0})
    }
}


const createIndexes = async (db) => {
    try{
    await db.collection("products").createIndex({price : 1});
    await db.collection("products").createIndex({name : 1, category : -1})
    await db.collection("products").createIndex({desc : "text"})
    console.log("indexes are created")
    }
    catch(err){
        console.log("Error while creating indexes",err);


    }
}


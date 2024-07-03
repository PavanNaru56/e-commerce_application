
import { getDB } from "../../config/mongodb.js";

class UserRepository{

    async signUp(newUser){

        try{

        //1 .  get the database

        const db = getDB();

        //2 . get the collection

        const collection = db.collection('users');

        // 3. Insert the document

        await collection.insertOne(newUser);
        return newUser;
    }catch(err){

        throw new ApplicationError("Something went wrong", 500)
    }
    }

    async findByEmail(email){

        try{

            const db = getDB();

            const collection = db.collection('users');

            const user = await collection.findOne({email : email});

            return user

        }catch(err){

            throw new ApplicationError("Invalid Credentials")

        }
    }

    


}

export default UserRepository;
import { getDB } from "../../config/mongodb.js";
export default class UserModel{

    constructor(name,email,password,type,id){

        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }
     static async signUp(name,email,password,type){

        try{

        //1 .  get the database

        const db = getDB();

        //2 . get the collection

        const collection = db.collection('users');


        const newUser = new UserModel(
            name,
            email,
            password,
            type
        );

        // 3. Insert the document

        await collection.insertOne(newUser);
        return newUser;
    }catch(err){

        throw new ApplicationError("Something went wrong", 500)
    }

    //return newUser;






        // user.id = users.length + 1;
        // users.push(user);
        // console.log(users);
        // return user;
    }

    static signIn(email,password){
       const oldUser = users.find((user) => user.email == email && user.password == password);
       return oldUser;

    }

    static getAll(){
        return users
    }


}




let users = [


    {

        id : 1,
        name : 'Seller User',
        email : 'a1@gmail.com',
        password : 'a',
        type : 'seller'


    },

    {

        id : 2,
        name : 'Customer User',
        email : 'c1@gmail.com',
        password : 'c',
        type : 'customer'


    }



];
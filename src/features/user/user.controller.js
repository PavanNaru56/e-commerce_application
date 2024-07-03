

import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
export default class UserController{


    constructor(){
        this.userRepository = new UserRepository();
    }


    async userSignUp(req,res){

        

        const {name,email,password,type} = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);


 
        const newUser = new UserModel(name,email,hashedPassword,type);

        


        await this.userRepository.signUp(newUser)
        res.status(201).send(newUser)

    }

    async userSignIn(req,res){

        try{

        const {email,password} = req.body;

        //const user = UserModel.signIn(email,password);

        //find email by email

        const verifyUser = await this.userRepository.findByEmail(email);

        if(!verifyUser){
            return res
            .status(400)
            .send("Invalid Credentials")
        }else{
            //compare password with hashed password.

            const result = await bcrypt.compare(password, verifyUser.password);

            //console.log(verifyUser);

            if(result){

                //send the token.

                const token = jwt.sign({userID : verifyUser._id, email : email }, process.env.JWT_SECRET, {
                    expiresIn : '1h'
                });


                return res.status(200).send(token);
            }else{
                return res.status(400).send('Invalid credentials')
            }


             

        }

    }catch(err){
        return res.status(400).send("Something went wrong")
    }
 }



}
import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next) => {

    // 1. Read the token

    const authHeaders = req.headers['authorization'];
    // 2. if no token, return an error

    if(!authHeaders){

        return res.status(401).send('Unauthorized')
    }

    //3. verify the token is valid

    try{

        const payload = jwt.verify(
            authHeaders,
            "iACBj5JRMUT6DTOPErOoAlvsUQX3Ygix" 

        );
        
        // for cart functionality to get ther user
        req.userId = payload.userID;

        console.log(payload);
    }catch(err){
        //4. return error
        return res.status(401).send('unauthorized');
    }

    // 5. call next middleware

    next()

}

export default jwtAuth;
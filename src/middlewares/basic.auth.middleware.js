
import UserModel from "../features/user/user.model.js";


const basicAuthorizer = (req,res,next) => {

    // 1. Check if authorization header is empty.

    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }

    console.log(authHeader);

    // 2. Extract credentials. [Basic qqwerty3456fghjk]

    const base64Credentials = authHeader.replace('Basic','');

    console.log(base64Credentials);

    // 3. decode credentials.

    const decodedCreds = Buffer.from(base64Credentials,'base64').toString('utf8');
    console.log(decodedCreds); // [username : password];

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find( u => u.email == creds[0] && u.password == creds[1]);
    if(user){
        next()
    }else{
        return res.status(401).send("incorrect credentials");
    }




}

export default basicAuthorizer;

// const basicAuthorizer = (req,res,next) => {

//     const authHeaders = req.headers["authorization"];

//     if(!authHeaders){
//         return res.status(400).send("No authors found");
//     }

//     const base64Credentials = authHeaders.replace('Basic','');

//     const decodeCreds = Buffer.from(base64Credentials,'base64').toString('utf8');

//     const creds = decodeCreds.split(':');

//     const user = UserModel.getAll().find((u) => u.email == creds[0] && u.password == creds[1]);

//     if(user){
//         next()
//     }
//     return res.status(401).send("Invalid Credentials");
// }



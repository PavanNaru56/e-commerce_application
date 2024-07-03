
import multer from "multer"

// create the middleware

const storage = multer.diskStorage({

    destination : function (req,file,cb){
        cb(null,'public/images');
    },

    filename : function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null,name)
    }

});


export const uploadFile = multer({storage : storage})
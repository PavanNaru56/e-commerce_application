
import ProdutModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController{


    constructor(){
        this.productRepository = new ProductRepository();
    }


    async getAllProducts(req,res){

        // const products = ProdutModel.getProducts();

        // res.status(200).send(products);

        try{

        const products = await  this.productRepository.getAll();
        res.status(200).send(products);
    

        }
        catch(err){

            console.log(err);
            return res.status(400).send("Something went wrong")


        }

        

    }

    // addProduct(req,res){

    //     console.log(req.body);
    //     const {name, price, sizes} = req.body;

    //     const newProduct = {
    //         name,
    //         price : parseFloat(price),
    //         sizes : sizes.split(','),
    //         imageUrl : 'images/' + req.file.filename
    //     }

    //     const createRecord = ProdutModel.add(newProduct);

    //     res.status(201).send(createRecord)




    // }


    async addProduct(req,res){

        try{

            const {name,price,sizes,imageUrl} = req.body;

            //const imageUrl =  req.body.imageUrl;

            console.log(imageUrl)


            const newProduct = new ProdutModel(name,parseFloat(price), sizes.split(','),imageUrl);

            const product =  await this.productRepository.add(newProduct);

            if(product){

                return res.status(200).send(product)
            }else{

                console.log("something went wrong");
                return 

            }

        }
        catch(err){

            console.log("Error in Database", err);
            return 


        }

        


    }





    async rateProduct(req,res){

        console.log(req.query)

        const userId = req.userId;
        const productId = req.body.productId;
        const rating  = req.body.rating;

        const error = this.productRepository.rate(userId,productId,rating);

        if(error){
            return res.status(400).send(error)
        }else{
            // const product = ProdutModel.getProducts().find(p => p.id == productId);

            return res.status(200).send("Successfully updated")
        }




    }

    async getOneProduct(req,res){

        // const id = req.params.id;
        // //console.log(id);
        // const product = ProdutModel.getOne(id);
        // //console.log(product);

        // if(!product){
        //     res.status(404).send("product not Found");
        // }
        // else{

        //     return res.status(200).send(product)
        // }

        try{

            const id = req.params.id;
            console.log(id);

            const product = await this.productRepository.getOne(id);

            if(!product){

                res.status(404).send("Product not found")
            }else{

            return res.status(200).send(product);
            }




        }
        catch(err){

        console.log(err);
        return res.status(400).send("Something went wrong")

            
        }




    }

    async filterProducts(req,res){

        try{

        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const categories = req.query.categories;
        //console.log(minPrice,maxPrice,category);
        // ['Cat1' , 'Cat2'] => ["Cat1","Cat2"]
        categories = JSON.parse(categories.replace(/'/g, '"' ))
        const result = await this.productRepository.filterProduct(
            minPrice,
    
            categories
        );

        //console.log(result)

        
        return res.status(200).send(result)
    }catch(err)
    {
        console.log(err);
        return res.status(400).send("Something went wrong")

    }


    }



    //Aggregation Pipeline

    async averageProduct(req,res,next){

        try{

            const result = await this.productRepository.averageProductPrice();
            return res.status(200).send(result)
        }
        catch(err)
    {
        console.log(err);
        return res.status(400).send("Something went wrong")

    }

    }


}
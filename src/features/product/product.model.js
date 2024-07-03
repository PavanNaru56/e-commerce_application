
import UserModel from "../user/user.model.js";

export default class ProdutModel{

    constructor(name,price,sizes,imageUrl,desc,category,id){
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }

    static getProducts(){

        return products

    }

    static add(product){

        product.id = products.length + 1;

        products.push(product);
        return product;

    }

    static getOne(id){
       const product = products.find(i => i.id == id);
       return product

    }

    static filterProduct(minPrice,maxPrice,category){
      
      //console.log(products);
      const result = products.filter((product) => {
        return (
        (!minPrice || product.price >= minPrice) &&
         (!maxPrice || product.price <= maxPrice )&&
         (!category || product.category == category)
        )

      }
      );

      //console.log(result);

      return result;


    }


    static rateProduct(userId,productId,rating){

      //1 validate the user

      const user = UserModel.getAll().find((u) => u.id == userId);
      if(!user){
        return "User not found"
      }


      // validate product
      const product = products.find((p) => p.id == productId);

      if(!product){
        return "Product not Found"

      }


      // check if there is any ratings or then add rating array

      if(!product.ratings){
        product.ratings = [];
        product.ratings.push(
          {
          userId : userId,
          rating : rating
        }
      );
      }else{

        // check if user ratings is already available.

        const existingRatingIndex = product.ratings.findIndex(
          (r) => r.userId == userId
        );

        if(existingRatingIndex >= 0){

          product.ratings[existingRatingIndex] = {
            userId : userId,
            rating : rating
            
          }


        }else{

          product.ratings.push({
            userId : userId,
            rating : rating
          })
        }



        
      }


      





    }

    


}


var products = [
    new ProdutModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1',
      ['S','M','L']
    ),
    new ProdutModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProdutModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];
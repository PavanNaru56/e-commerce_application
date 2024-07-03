

// productID, userId, quantity

export default class CartItemModel{

    constructor(productId, userId, quantity,id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id

    }

    static addItemsCart(productId, userId, quantity){

        const cartItem = new CartItemModel(productId, userId, quantity);
        cartItem.id = cartItems.length + 1;

        cartItems.push(cartItem);

        return cartItem


    }

    static getCartItems(userId){

        return cartItems.filter((c) => c.userId == userId)
    }


    static deleteItem(cartItemId,userId){

        const cartItem = cartItems.find(i => i.id == cartItemId && i.userId == userId);

        if(cartItem == -1){
            return "Item not found"
        }else{

            const index = cartItems.indexOf(i => i.id == cartItemId);

            cartItems.splice(index,1);


        }



    }






}

var cartItems = [

    new CartItemModel(1,2,1,1),
    new CartItemModel(1,1,2,2),




]
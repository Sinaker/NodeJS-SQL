fs = require('fs');
path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
    static addProduct(id, prodPrice)
    {
        console.log(id, prodPrice);
        fs.readFile(p, (err, data) => {
            let cart = {products: [], totalPrice: []}
            if(!err)
                cart = JSON.parse(data);

            //Now we need to add the product
            const productIndex = cart.products.findIndex(product => (product.id===id))

            if(productIndex!=-1) //If such product exists then just increase quantity
            {
                console.log(productIndex, cart.products[productIndex])
                cart.products[productIndex].qty += 1
            }
            else //Add item to cart and set quantity to one
            {
                const newProduct = {id: id, qty: 1};
                cart.products = [...cart.products, newProduct]; //Add item to cart
            }
            cart.totalPrice += prodPrice;
            //Writing to file
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        })
    }
}
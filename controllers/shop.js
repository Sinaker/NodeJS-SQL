const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then (products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err))
    
};

exports.getCart = (req, res, next) => {
  req.user.getCart() // Magic association function
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      console.error("Error = " + err);
      next(err); // Pass the error to the next middleware
    });
};


exports.postCart = (req, res, next) => {
  const prodId = req.params.productID ;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path : '/orders',
    pageTitle: 'Orders'
  });
};

exports.getDetails = (req, res, next) => {
  const prodID = req.params.productID;
  Product.findByPk(prodID)
  .then(product => {
    res.render('shop/product-detail', {product: product, path:"/products", pageTitle: product.title})
  })
  .catch((err) => {
    console.log(err);
    res.redirect('/invalidProduct');

  })
};

exports.deleteItemFromCart = (req, res, next) => {
  const prodId = req.params.productID;
  req.user.getCart()
  .then( cart => cart.getProducts({ where: { id: prodId } }))
  .then(([product]) => {
    //Since we click a button we are guaranteed that product is valid
    return product.cartItem.destroy()
  })
  .then(result => res.redirect('/cart'))
  .catch(err => console.log(err))
}

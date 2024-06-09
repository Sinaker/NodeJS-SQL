const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.putCart = (req, res, next) => {
  const prodID = req.params.productID;
  Product.fetchByID(prodID, product => {
    Cart.addProduct(product.id, product.price);
    res.redirect('/cart');
  })
}

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
  Product.fetchByID(prodID, product => {
    console.log(product);
    res.render('shop/product-detail', {product: product, path:"/products", pageTitle: product.title})
  });
};

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    product: null,
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const prodID = req.params.productID;
  Product.fetchByID(prodID, (product) => {
    res.render('admin/add-product', {
      product: product,
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: true
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productID; //From hidden input
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/products');
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productID;
  console.log("Reached here");
  Product.deleteByID(id);
  res.redirect('/admin/products')

}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

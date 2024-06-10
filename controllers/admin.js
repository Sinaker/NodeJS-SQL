const { where } = require('sequelize');
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
  req.user.createProduct({ //sequel creates magic associationfunctions since we defined the association already
    title: title,
    price: price,
    imageUrl: imageUrl,
    description, description,
  })
  .then(() => res.redirect('/products'))
  .catch((err) => console.log("Error in writing data = "+err));
};

exports.getEditProduct = (req, res, next) => {
  const prodID = req.params.productID;
  req.user.getProducts({where: {id: prodID}}) //Magic Association functions
  .then(([product]) => {
    res.render('admin/add-product', {
      product: product,
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: true
    });
  })
  .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productID; //From hidden input
  const updated_title = req.body.title;
  const updated_price = req.body.price;
  const updated_description = req.body.description;
  const updated_imageUrl = req.body.imageUrl;
  req.user.getProducts({where: {id: prodID}}) //Magic Association functions
  .then( ([product]) => {//If product Already exists, update
    product.title = updated_title;
    product.price = updated_price;
    product.description = updated_description;
    product.imageUrl = updated_imageUrl;

    return product.save(); //Avoid nesting
  }) 
  .then(result => {
    console.log("UPDATE SUCCESSFUL")
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productID;
  res.user.removeProduct({where: {id: id}})
  .catch((err) => console.log("Error in deleting = "+err))
  .finally(() => res.redirect('/admin/products'));
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};

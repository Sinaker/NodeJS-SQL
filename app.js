const path = require('path');
const sequelize = require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next()
    }
    )
    .catch(err => console.log(err))
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Assocations
User.hasMany(Product);
User.hasOne(Cart); //Cart.belongsTo(User) => Inverse
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync()
.then(()=> {
    return User.findByPk(1)//Dummy User
})
.then(user => {
   return user ? Promise.resolve(user) : User.create({name: 'dummy', email: 'test@test.com'})
})
.then(user => {
    return user.createCart()
})
.then(cart => app.listen(3000))
.catch((err) => console.log(err));

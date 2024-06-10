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
const Users = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {
    Users.findByPk(1)
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

Users.hasMany(Product);
Product.belongsTo(Users, {constraints: true, onDelete: 'CASCADE'});

sequelize.sync()
.then(()=> {
    return Users.findByPk(1)//Dummy User
})
.then(user => {
   return user ? Promise.resolve(user) : Users.create({name: 'dummy', email: 'test@test.com'})
})
.then(user => {
    app.listen(3000);
})
.catch((err) => console.log(err));

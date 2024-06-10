const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },

},

{
  freezeTableName: true //By default sequelize auto-pluralises table you can add this to prevent that
  // tableName: 'sequelize-products' //Or provide table name directly
}
);

module.exports = Product;
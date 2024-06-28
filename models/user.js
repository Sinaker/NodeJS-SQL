const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false}
}, 
{tableName: "Users"}
);

module.exports = Users;
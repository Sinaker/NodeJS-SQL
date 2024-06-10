const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequalize = new Sequelize(
  "node",
  process.env.SQL_USER,
  process.env.SQL_PASS,
  { dialect: "mysql", host: "localhost" }
);

module.exports = sequalize;

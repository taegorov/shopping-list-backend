'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./user.schema.js');
const listSchema = require('./list.schema.js')

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
// const DATABASE_URL = 'postgres://postgres@localhost:5432';

// below: throw a !== instead of ===  if you want to connect to ElephantSQL database LOCALLY (instead of local)
// for PRODUCTION, use ===
// === === // THE BELOW IS DATABASE URL FOR WHEN NODE_ENV IS SET UP // === === //
// const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_PROD : process.env.DATABASE_DEV


// Heroku needs this to run Sequelize
let sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    }
  }
});

const user = userSchema(sequelize, DataTypes);
const list = listSchema(sequelize, DataTypes);


// --- if you need to add a new column or whatevs --- //
// list.sync({ alter: true })

// --- if you need to drop the table --- //
// user.drop();
// console.log("user table dropped!");

user.hasMany(list, { foreignKey: 'userId', sourceKey: 'id' })
list.belongsTo(user, { foreignKey: 'userId', targetKey: 'id' })

// customers.hasMany(notes, { foreignKey: 'customerId', sourceKey: 'id' });
// notes.belongsTo(customers, { foreignKey: 'customerId', targetKey: 'id' });


module.exports = {
  db: sequelize,
  user: user,
  list: list,
}

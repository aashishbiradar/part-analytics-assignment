const { Sequelize } = require('sequelize');
const { postgresUrl } = require('../config'); 

const sequelize = new Sequelize(postgresUrl);

module.exports = sequelize;
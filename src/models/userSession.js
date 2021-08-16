const { DataTypes, Model } = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user');

class UserSession extends Model {}

UserSession.init({}, {
  sequelize,
  modelName: 'userSession',
});


module.exports = UserSession;
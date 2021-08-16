const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../services/sequelize');

class User extends Model {}

User.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  age: {
    type: DataTypes.INTEGER 
  },
  city: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  }
}, {
  sequelize,
  modelName: 'user',
});

module.exports = User;
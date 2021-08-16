const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../services/sequelize');

class Game extends Model {}

Game.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'game',
});

module.exports = Game;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../services/sequelize');

class GameSession extends Model {}

GameSession.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  sequelize,
  modelName: 'gameSession',
});

module.exports = GameSession;
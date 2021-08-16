const User = require('./user');
const Game = require('./game');
const UserSession = require('./userSession');
const GameSession = require('./gamePlaySession');

User.hasMany(UserSession);
UserSession.belongsTo(User, { as: 'user' });

User.hasMany(GameSession);
Game.hasMany(GameSession);
GameSession.belongsTo(User, { as: 'user' });
GameSession.belongsTo(Game, { as: 'game' });

module.exports = {
  User,
  Game,
  UserSession,
  GameSession,
};
const _ = require('lodash');
const { Sequelize, Op } = require('sequelize'); 
const { Game, GameSession } = require('../models');
const moment = require('moment');

module.exports = {
  async create(gameDetails) {
    const gameMeta = _.pick(gameDetails, ['name']);
    const game = await Game.create(gameMeta);
    return game.toJSON();
  },
  async userList(userId) {
    const [games, userHighScores, gameHighScores] = await Promise.all[
      Game.findAll({ raw: true }),
      GameSession.findAll({
        where: { userId },
        attributes: [
          'gameId',
          [Sequelize.fn('max', Sequelize.col('score')), 'highscore']
        ],
        group: ["gameId"],
        raw: true,
      }),
      GameSession.findAll({
        attributes: [
          'gameId',
          [Sequelize.fn('max', Sequelize.col('score')), 'highscore']
        ],
        group: ["gameId"],
        raw: true,
      })
    ];
    const userHighScoresMap = _.keyBy(userHighScores, 'gameId');
    const gameHighScoresMap = _.keyBy(gameHighScores, 'gameId');
    for (const game of games) {
      if (userHighScoresMap[game.id]) game.myHighScore = userHighScoresMap[game.id].highscore;
      if (gameHighScoresMap[game.id]) game.communityHighScore = gameHighScoresMap[game.id].highscore;
    }
    return games;
  },
  async adminList() {
    const [games, userCount, gameHighScores] = await Promise.all([
      Game.findAll({ raw: true }),
      GameSession.findAll({
        where: {
          createdAt: {
            [Op.gte]: moment().subtract(1, 'hour').toDate()
          }
        },
        attributes: [
          'gameId',
          [Sequelize.fn('count', Sequelize.col('gameId')), 'noOfTimes']
        ],
        group: ["gameId", "userId"],
        raw: true,
      }),
      GameSession.findAll({
        attributes: [
          'gameId',
          [Sequelize.fn('max', Sequelize.col('score')), 'highscore']
        ],
        group: ["gameId"],
        raw: true,
      })
    ]);
    const userCountMap = _.groupBy(userCount, 'gameId');
    const gameHighScoresMap = _.keyBy(gameHighScores, 'gameId');
    for (const game of games) {
      if (userCountMap[game.id]) game.userCount = userCountMap[game.id].length;
      if (gameHighScoresMap[game.id]) game.communityHighScore = gameHighScoresMap[game.id].highscore;
    }
    return games;
  },
  async createSession(sessionDetails) {
    const sessionMeta = _.pick(sessionDetails, ['gameId', 'userId', 'score']);
    const session = await GameSession.create(sessionMeta);
    return session;
  },
};

const gameService = require('../services/game');
const { roles } = require('../consts');

module.exports = {
  async create(req, res) {
    try {
      const newGame = await gameService.create(req.body);
      res.json(newGame);
    } catch (error) {
      console.error(error)
      res.status(400).send({ error: error.message });
    }
  },
  async list(req, res) {
    try {
      let games;
      if (req.user.role === roles.admin) {
        games = await gameService.adminList(req.user.id);
      } else {
        games = await gameService.userList(req.user.id);
      }
      res.json(games);
    } catch (error) {
      console.error(error)
      res.status(400).send({ error: error.message });
    }
  },
  async submitScore(req, res) {
    try {
      const { gameId, score } = req.body;
      const sessionMeta = {
        userId: req.user.id,
        gameId,
        score
      };
      const gameSession = await gameService.createSession(sessionMeta);
      res.json(gameSession);
    } catch (error) {
      console.error(error)
      res.status(400).send({ error: error.message });
    }
  }
};

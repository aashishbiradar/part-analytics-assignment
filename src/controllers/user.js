const auth = require('../services/auth');
const consts = require('../consts');

module.exports = {
  me(req, res) {
    res.send(req.user);
  },

  async signup(req, res) {
    try {
      const newUser = await auth.signup(req.body);
      auth.createSession(user.id);
      newUser.token = auth.generateToken(newUser);
      res.send(newUser);
    } catch (error) {
      console.error(error)
      res.status(400).send({ error: error.message });
    }
  },

  async authenticate(req, res, next) {
    try {
      const token = req.header('Authorization');
      req.user = await auth.authenticate(token);
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ error: error.message });
    }
  },

  async authenticateAdmin(req, res, next) {
    try {
      const token = req.header('Authorization');
      req.user = await auth.authenticate(token);
      if (req.user.role !== consts.roles.admin) {
        throw new Error('Access Denied');
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const user = await auth.login(req.body);
      auth.createSession(user.id);
      user.token = auth.generateToken(user);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const users = await auth.listUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  },
};
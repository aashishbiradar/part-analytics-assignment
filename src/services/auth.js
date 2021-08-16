const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { User, UserSession } = require('../models');
const config = require('../config');

module.exports = {
  async signup(userDetails) {
    const userMeta = _.pick(userDetails, ['name', 'email', 'password', 'age', 'city']);
    userMeta.password = await argon2.hash(userMeta.password);
    const user = await User.create(userMeta);
    let userObj = user.toJSON();
    userObj = _.omit(userObj, ['password']);
    return userObj;
  },

  async login(userDetails) {
    const user = await User.findOne({ where: { email: userDetails.email } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!await argon2.verify(user.password, userDetails.password)) {
      throw new Error('Incorrect password');
    }
    const userObj = _.omit(user.toJSON(), ['password']);
    return userObj;
  },

  generateToken(userObj) {
    const user = {
      id: userObj.id.toString(),
      email: userObj.email,
    };
    return jwt.sign({ user }, config.secretKey, { expiresIn: config.jwtExpiry }).toString();
  },

  async authenticate(token) {
    const { user } = jwt.verify(token, config.secretKey);
    const userRecord = await User.findByPk(user.id);
    if (!userRecord) {
      throw new Error('invalid user');
    }
    const userObj = _.omit(userRecord.toJSON(), ['password']);
    return userObj;
  },

  async createSession(userId) {
    const session = await UserSession.create({ userId });
    return session;
  },

  async listUsers() {
    const users = await User.findAll();
    return users;
  },
};

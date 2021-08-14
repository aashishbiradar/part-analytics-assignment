const express = require('express');
const { port } = require('./config');
const sequelize = require('./services/sequelize');
const routes = require('./routes');

(async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', routes);

    app.get('/ping', (req, res) => {
      res.send('pong');
    });
    await sequelize.sync();
    console.log('DB Connection has been established successfully.');
    app.listen(port, () => console.log(`Server is up on port ${port}`));
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
const express = require('express');
const sequelize = require('./services/sequelize');
const routes = require('./routes');
const { port } = require('./config');

(async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // to check if server is up
    app.get('/ping', (req, res) => res.send('pong'));

    app.use('/api', routes);

    await sequelize.sync();
    console.log('DB Connection has been established successfully.');
    app.listen(port, () => console.log(`Server is up on port ${port}`));
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
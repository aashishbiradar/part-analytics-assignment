const { Router } = require('express');

const router = Router();

router.use('/user', require('./user'));
router.use('/game', require('./game'));

module.exports = router;
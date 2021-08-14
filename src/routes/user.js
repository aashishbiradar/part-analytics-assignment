const { Router } = require('express');
const ctrl = require('../controllers/user');

const router = Router();
const { authenticate } = ctrl;

router.get('/me', authenticate, ctrl.me);
router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);

module.exports = router;
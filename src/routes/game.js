const { Router } = require('express');
const ctrl = require('../controllers/game');
const { authenticate,  authenticateAdmin } = require('../controllers/user');

const router = Router();

router.get('/list', authenticate, ctrl.list);

router.post('/create', authenticateAdmin, ctrl.create);
router.post('/submit-score', authenticate, ctrl.submitScore);

module.exports = router;
const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/AuthController');

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

module.exports = router;
const express = require('express');

const router = express.Router();

const { login } = require('../controllers/users');

router.post('/', login);

module.exports = router;

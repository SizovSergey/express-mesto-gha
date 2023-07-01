const express = require('express');

const router = express.Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

module.exports = router;
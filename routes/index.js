const express = require('express');
const router = express.Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const loginRouter = require('./signIn');
const registerRouter = require('./signUp');

router.use('/signin', loginRouter);
router.use('/signup', registerRouter);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

module.exports = router;

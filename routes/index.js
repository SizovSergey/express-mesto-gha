const express = require('express');

const router = express.Router();

const { cardValidate, userValidate, loginValidate} = require('../middlewares/validate');

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const loginRouter = require('./signIn');
const registerRouter = require('./signUp');

router.use('/cards', cardValidate, cardsRouter);
router.use('/users', usersRouter);
router.use('/signin', loginValidate, loginRouter);
router.use('/signup', userValidate, registerRouter);

module.exports = router;

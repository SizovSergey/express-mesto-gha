const express = require('express');

const {
  celebrate, Joi, Segments,
} = require('celebrate');

const router = express.Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const loginRouter = require('./signIn');
const registerRouter = require('./signUp');

router.use('/signin', loginRouter);
router.use('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), registerRouter);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

module.exports = router;

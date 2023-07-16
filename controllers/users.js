const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const JWT_SECRET = require('../helpers/jwt');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send(user.name, user.about, user.avatar, user.email);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError({ message: 'Пользователь с таким email уже есть' }));
      } else if (err instanceof BadRequestError) {
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Неправильный тип данных'));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError({ message: 'Нет пользователя с таким id' }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Неверная ссылка'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const userId = req.user._id;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user || !password) {
        next(new BadRequestError('Неверный email или пароль.'));
      }
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        })
        .status(200)
        .send(token);
    })
    .catch((err) => next(err));
};

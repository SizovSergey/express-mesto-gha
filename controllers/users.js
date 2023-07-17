// пришлось убрать env из gitignore,потому что тесты так не проходились
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные заполнены неверно'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
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
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  const id = req.params._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send(user);
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
      res.status(200).send(user);
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
      res.status(200).send(user);
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
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!email || !password) {
        next(new UnauthorizedError('Неверный email или пароль.'));
      }
      const token = jwt.sign({ _id: user._id }, 'supersecretkeysizovsergey', { expiresIn: '7d' });
      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        })
        .status(200)
        .send({ token });
    })
    .catch((err) => next(err));
};

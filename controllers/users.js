const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleErrors } = require('../utils/errors');

module.exports.createUser = (req, res) => {
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
      res.send(user);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new mongoose.Error.DocumentNotFoundError())
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new mongoose.Error.DocumentNotFoundError())
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new mongoose.Error.DocumentNotFoundError())
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

const User = require('../models/user');


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).select('-__v')
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getUsers = (req, res) => {
  User.find({}).select('-__v')
    .then((users) => {
      res.send({ data: users });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id).select('-__v')
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true }).select('-__v')
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true }).select('-__v')
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

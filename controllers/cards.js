const mongoose = require('mongoose');
const Card = require('../models/card');

const { handleErrors } = require('../utils/errors');

module.exports.createCard = (req, res) => {
  const {
    name, link,
  } = req.body;

  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id)
    .orFail(new mongoose.Error.DocumentNotFoundError())
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.likeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new mongoose.Error.DocumentNotFoundError())
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

module.exports.dislikeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new mongoose.Error.DocumentNotFoundError())
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

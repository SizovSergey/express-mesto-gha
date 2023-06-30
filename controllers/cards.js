const Card = require('../models/card');
const { ERROR_NOT_FOUND, handleErrors } = require('../utils/errors');

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
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
        return;
      }
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
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
        return;
      }
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
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      handleErrors(error, res);
    });
};

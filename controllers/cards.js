const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.createCard = (req, res, next) => {
  const {
    name, link,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы неверные данные.'));
      }
      return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const id = req.params._id;
  const userId = req.user._id;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      } else if (card.owner.toString() !== userId.toString()) {
        throw new ForbiddenError('Нельзя удалять карточки с местами других пользователей');
      } else {
        Card.deleteOne(card)
          .then((deletedCard) => {
            res.send(deletedCard);
          })
          .catch(next);
      }
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  const id = req.params._id;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw (new NotFoundError('Карточка с таким id не найдена'));
      }
      res.status(200).send(card);
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  const id = req.params._id;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw (new NotFoundError('Карточка с таким id не найдена'));
      }
      res.status(200).send(card);
    })
    .catch((err) => next(err));
};

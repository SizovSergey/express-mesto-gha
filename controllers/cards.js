const Card = require('../models/card');

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
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации.Вы не ввели имя карточки или ссылку на картинку' });
        return;
      }
      res.status(500).send({ message: 'Сервер упал.Возможно скоро он заработает' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({}).select('-__v')
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      if (error.name === 'NotFoundError') {
        res.status(404).send({ message: 'Не найдена карточка с таким ID' });
        return;
      }
      res.status(500).send({ message: 'Сервер упал.Возможно скоро он заработает' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id).select('-__v')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'NotFoundError') {
        res.status(404).send({ message: 'Не найдена карточка с таким ID' });
        return;
      }
      res.status(500).send({ message: 'Сервер упал.Возможно скоро он заработает' });
    });
};

module.exports.likeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).select('-__v')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.dislikeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).select('-__v')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

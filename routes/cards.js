const express = require('express');

const router = express.Router();

const { cardValidate } = require('../middlewares/validate');

const auth = require('../middlewares/auth');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/', auth, cardValidate, createCard);
router.get('/', auth, getCards);
router.delete('/:_id', auth, deleteCard);
router.put('/:_id/likes', auth, likeCard);
router.delete('/:_id/likes', auth, dislikeCard);

module.exports = router;

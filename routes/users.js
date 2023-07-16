const express = require('express');

const router = express.Router();

const { avatarValidate, userUpdateValidate, validateId } = require('../middlewares/validate');

const auth = require('../middlewares/auth');

const {
  getUsers, getUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:_id', auth, validateId, getUser);
router.patch('/me', auth, userUpdateValidate, updateUser);
router.patch('/me/avatar', auth, avatarValidate, updateAvatar);

module.exports = router;

const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const {
  getUsers, getUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:id', auth, getUser);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;

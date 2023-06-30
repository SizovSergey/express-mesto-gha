const express = require('express');

const router = express.Router();

// eslint-disable-next-line import/no-unresolved
const {
  createUser, getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

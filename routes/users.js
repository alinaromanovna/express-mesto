const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUsersMe,
  updateUserById,
  updateAvatarById,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.get('/users/me', getUsersMe);

router.patch('/users/me', updateUserById);

router.patch('/users/me/avatar', updateAvatarById);

module.exports = router;

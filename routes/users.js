const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUserById,
  getUsers,
  createUser,
  login,
} = require('../controllers/users');

usersRouter
  .post('/signin', login)
  .post('/signup', createUser);
usersRouter
  .get('/users', auth, getUsers)
  .get('/users/:_id', auth, getUserById);

module.exports = usersRouter;

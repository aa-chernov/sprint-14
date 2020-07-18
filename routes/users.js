const usersRouter = require('express').Router();

const { getUserById, getUsers, createUser } = require('../controllers/users');

usersRouter.route('/users')
  .get(getUsers)
  .post(createUser);
usersRouter.get('/users/:_id', getUserById);

module.exports = usersRouter;

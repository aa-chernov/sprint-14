const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-dynamic-require
const User = require(path.join('..', 'models', 'user'));
const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: 'Данные пользователя введены не полностью' });
  } else {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-dev-secret', { expiresIn: '7d' },
        );
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .send({ _id: user._id, message: 'Авторизация выполнена успешно' });
      })
      .catch((err) => {
        res.status(401).send({ message: err.message });
      });
  }
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res
      .send({
        data: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        },
        message: `Создан пользователь: ${name}`,
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res
      .status(500)
      .send({ message: err.message }));
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User
      .findById(req.params._id)
      .orFail(new Error('Нет пользователя с таким id'));
    res.json({ user });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

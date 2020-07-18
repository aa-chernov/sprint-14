const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const User = require(path.join('..', 'models', 'user'));

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res
      .send({ data: user, message: `Создан пользователь: ${name}` }))
    .catch((err) => res
      .status(500)
      .send({ message: err.message }));
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

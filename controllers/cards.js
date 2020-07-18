const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const Card = require(path.join('..', 'models', 'card'));

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res
      .status(500)
      .send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res
      .send({ data: card, message: `Создана карточка: ${name}` }))
    .catch((err) => res
      .status(500)
      .send({ message: err.message }));
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params._id);
    if (card === null) {
      res.status(404).send({ message: 'Нет такой карточки' });
    } else {
      res.send({ message: `Удалена карточка ${card.name} с id ${card._id}`, card });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message });
  }
};

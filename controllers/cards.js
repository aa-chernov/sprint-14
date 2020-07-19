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

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: 'Нет такой карточки' });
      } else if (card.owner.toString() !== req.user._id) {
        res
          .status(403)
          .send({ message: 'Вы не можете удалить эту карточку' });
      } else {
        return Card.findByIdAndRemove(req.params._id)
          .then((cardForDel) => {
            res.send({ message: `Удалена карточка ${cardForDel.name} с id ${cardForDel._id}` });
          })
          .catch((err) => res.status(404).send({ message: err.message }));
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message });
    });
};

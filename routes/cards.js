const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');

const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.route('/cards')
  .get(auth, getCards)
  .post(auth, createCard);
cardsRouter.delete('/cards/:_id', auth, deleteCard);

module.exports = cardsRouter;

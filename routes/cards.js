const cardsRouter = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.route('/cards')
  .get(getCards)
  .post(createCard);
cardsRouter.delete('/cards/:_id', deleteCard);

module.exports = cardsRouter;

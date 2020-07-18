const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cardsPath = require('./routes/cards');
const usersPath = require('./routes/users');
const resourcePath = require('./routes/resource');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f03d982e826b3986cbc8ef4',
  };

  next();
});

app
  .use(bodyParser.json())
  .use('/', cardsPath)
  .use('/', usersPath)
  .use('/', resourcePath)
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Слушаем порт: ${PORT}`);
  });

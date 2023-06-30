const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649f1e04a89bcd58dcaf3e25',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT);

require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const routes = require('./routes/index');

const { errors } = require('celebrate');

const errorsHandler = require('./middlewares/errorsHandler');

const { ERROR_NOT_FOUND } = require('./utils/errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Задан неверный эндпойнт',
  });
});

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);

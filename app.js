require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const routes = require('./routes/index');

const errorsHandler = require('./middlewares/errorsHandler');

const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(routes);

app.use(() => {
  throw new NotFoundError('неверный эндпойнт');
});

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);

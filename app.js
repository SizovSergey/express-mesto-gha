const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/index');

const { ERROR_NOT_FOUND } = require('./utils/errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '649fd19763c7785b48b683cb',
  };

  next();
});

app.use(routes);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Задан неверный эндпойнт',
  });
});

app.listen(PORT);

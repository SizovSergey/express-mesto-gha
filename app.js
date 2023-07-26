const express = require('express');

const cors = require('cors');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const app = express();

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const routes = require('./routes/index');

const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use('/api', apiLimiter);

app.use(routes);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);

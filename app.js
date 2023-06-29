const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001, BASE_PATH } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(BASE_PATH);
})
const errorsHandler = ((err, req, res, next) => {
  console.log(err.stack);
  const { statusCode, message } = err;

  res
    .status(statusCode || 500)
    .send({
      message: message || 'На сервере произошла ошибка',
    });
  next();
});

module.exports = errorsHandler;

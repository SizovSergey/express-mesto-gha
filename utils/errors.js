const mongoose = require('mongoose');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;

const handleErrors = (error, res) => {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
  }
  if (error instanceof mongoose.Error.SyntaxError) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Запрос передан с синтаксическими ошибками' });
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Ошибка валидации данных.' });
  }
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(ERROR_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
  }
  return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
};

module.exports = {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  handleErrors,
};

const jwt = require('jsonwebtoken');

const UnathorizedError = require('../errors/unauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnathorizedError('Необходима авторизация.');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'supersecretkeysizovsergey');
  } catch (err) {
    throw new UnathorizedError('Необходима авторизация.');
  }

  req.user = payload;

  next();
};

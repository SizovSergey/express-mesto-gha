const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const getJwtToken = (_id) => jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' });

module.exports = getJwtToken;

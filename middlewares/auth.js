const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Нужна авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};

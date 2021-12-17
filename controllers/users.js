/* eslint-disable brace-style */
/* eslint-disable consistent-return */
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send({ data: user });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные в методы создания пользователя;' });
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

// eslint-disable-next-line consistent-return
module.exports.updateUserById = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введены некорректные данные в методы обновления профиля;' });
      }
      // eslint-disable-next-line no-else-return
      else if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

// eslint-disable-next-line consistent-return
module.exports.updateAvatarById = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
  }
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные в методы создания аватара пользователя;' });
      }
      // eslint-disable-next-line no-else-return
      else if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

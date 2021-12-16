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
      if (user) {
        res.status(200).send({ data: user });
      }
      res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => {
      res.status(201).send({ name, about, avatar });
    })
    .catch(() => {
      res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки;' });
    });
};

module.exports.updateUserById = (req, res) => {
  const { name, about } = req.body;
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
      res.status(200).send({ name, about });
    })
    .catch(() => {
      if ('ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные в методы обновления профиля;' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.updateAvatarById = (req, res) => {
  const { avatar } = req.body;

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
      res.status(200).send({ avatar });
    })
    .catch(() => {
      if ('ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные в методы создания аватара пользователя;' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

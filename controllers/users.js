const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserById = (req, res) => {
  const { _id } = req.params;

  User.findById(_id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      }
      res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
    })

    .catch((err) => {
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
      res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;' });
    });
};
module.exports.updateUserById = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (user) {
        res.status(200).send({ name, about });
      }
      res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
    })

    .catch((err) => {
      if (err.status === 400) {
        res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;' });
      }
      else if (err.status === 500) {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.updateAvatarById = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (user) {
        res.status(200).send({ avatar });
      }
      res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
    })

    .catch((err) => {
      if (err.status === 400) {
        res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;' });
      }
      else if (err.status === 500) {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

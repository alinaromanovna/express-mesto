const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link) {
    return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
  }
  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch(() => {
      res.status(400).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    // eslint-disable-next-line consistent-return
    .then(() => {
      res.status(200).send({ message: 'Карточка удалена' });
    })
    // eslint-disable-next-line consistent-return
    .catch(() => {
      if ('NotFoundError') {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => {
      if (!req.params.cardId) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(200).send({ message: 'Лайк поставлен!' });
    })
    .catch(() => {
      if ('CastError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(200).send({ message: 'Лайк снят!' });
    })
    .catch(() => {
      if ('CastError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

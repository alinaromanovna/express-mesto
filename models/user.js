const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Бигль Нора',
  },
  avatar: {
    type: String, // гендер — это строка
    required: true,
    default: 'https://www.belanta.vet/vet-blog/wp-content/uploads/2016/04/poroda-sobak-bigl-01.jpeg',
  },
  about: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30,
    default: 'Бегу навстречу приключениям',
  },
});
module.exports = mongoose.model('user', userSchema);

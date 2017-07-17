var user = require('../models/user');
var book = require('../models/user')
var profile = require('./profile');


exports.addbook = (author, title, language, genre, price, sold) =>

  new Promise((resolve, reject) => {

    const newBook = new book({
      author: author,
        title: title,
        language: language,
        genre: genre,
        price: price,
        sold: false
      });

    newBook.save()

    .then(() => {resolve({message: 'book added successfully'})})
    .catch(err => {reject({message: 'could not add the book'})});

});

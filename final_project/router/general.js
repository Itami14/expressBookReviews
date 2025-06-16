const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 4));
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  // let matched_isbn = (books).filter((book) => book.isbn === isbn);
  // res.send(matched_isbn)
  res.send(JSON.stringify(books[isbn],null,4));
  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let matched_author = Object.values(books).filter((book) => book.author === author);
  res.send(JSON.stringify(matched_author, null,4));
  // res.send(books[author]);
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let matched_title = Object.values(books).filter((book) => book.title === title);
  res.send(JSON.stringify(matched_title,null,4));
  // res.send(books[title])

  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const book_review = req.params.review;
  const review_isbn = req.params.isbn;
  const book_isbn = books[review_isbn];
  
  if (book_isbn) {
    let matched_review_isbn = Object.values(books).filter((book) => book.review === book_review);
    res.send(JSON.stringify(book_isbn,null,4));
  }

  
  // res.send(books[review])
  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

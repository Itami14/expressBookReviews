const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
 
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if(!isValid(username)){
      users.push({ "username": username, "password": password });
      return res.status(200).json({message: "User successfully registered, now you can login."});
    } else{
      return res.status(404).json({message:"User already exists."})
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',async (req, res) => {
 
  try{
    const bookList = await new Promise((resolve, reject) => {
      if (books) {
        resolve(books);
      } else {
        reject(new Error('Booklist not available'))
      }
    });
  
      return res.status(200).send(JSON.stringify(bookList,null,4));
   
  } catch (error) {
    res.status(500).json({ message: 'Error getting booklist', error: error.message });
}
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  
  const isbn = req.params.isbn;
    
  new Promise((resolve, reject) => {
    let matched_books = books[isbn];
    if (matched_books) {
      resolve(matched_books)
    } else {
      reject('There is no book with that isbn.')
    }
  })
    .then((matched_books) => {
      res.status(200).send(JSON.stringify(matched_books, null, 4));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error))
    });

   });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const author = req.params.author;
  new Promise((resolve, reject) => {
    let matched_author = Object.values(books).filter((book) => book.author === author);
    if (matched_author.length > 0) {
      resolve(matched_author)
    } else {
      reject('Author not found')
    }
  })
    .then((matched_author) => {
      res.status(200).send(JSON.stringify(matched_author, null, 4))
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error))
    });
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

   const title = req.params.title;
  new Promise((resolve, reject) => {
    let matched_title = Object.values(books).filter((book) => book.title === title);
    if (matched_title.length > 0) {
      resolve(matched_title)
    } else {
      reject('Author not found')
    }
  })
    .then((matched_title) => {
      res.status(200).send(JSON.stringify(matched_title, null, 4))
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error))
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
 
  const book_review = req.params.review;
  const review_isbn = req.params.isbn;
  const book_isbn = books[review_isbn];
  
  if (book_isbn) {
    let matched_review_isbn = Object.values(books).filter((book) => book.review === book_review);
    res.send(JSON.stringify(book_isbn['reivews'],null,4));
  }
});

module.exports.general = public_users;

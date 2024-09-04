import fs from "fs/promises";
import path from "path";

const booksPath = path.resolve("data", "books.json");

const updateBooks = (books) =>
  fs.writeFile(booksPath, JSON.stringify(books, null, 2));

export const allBooks = async () => {
  const books = await fs.readFile(booksPath);
  return JSON.parse(books);
};

export const addBook = async (data) => {
  const books = await allBooks();
  const newBook = { ...data };
  books.push(newBook);
  await updateBooks(books);
  return newBook;
};

export const editBook = async (bookIsbn, data) => {
  const books = await allBooks();
  const index = books.findIndex((item) => item.isbn === bookIsbn);
  if (index === -1) {
    return null;
  }
  books[index] = { ...books[index], ...data };
  await updateBooks(books);
  return books[index];
};

export const removeBook = async (bookIsbn) => {
  const books = await allBooks();
  const index = books.findIndex((item) => item.isbn == bookIsbn);

  if (index === -1) {
    return null;
  }

  books.splice(index, 1);
  await updateBooks(books);
};

export const lendBook = async (bookIsbn) => {
  const books = await allBooks();
  const index = books.findIndex((item) => item.isbn === bookIsbn);
  if (index === -1) {
    return null;
  }
  if (books[index].isBorrowed === true) {
    books[index].isBorrowed = false;
  } else {
    books[index].isBorrowed = true;
  }

  await updateBooks(books);
  return books[index];
};

export const findBook = async (bookIsbn) => {
  const books = await allBooks();
  const index = books.findIndex((item) => item.isbn === bookIsbn);
  if (index === -1) {
    return null;
  }
  return books[index];
};

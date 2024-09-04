import {
  addBook,
  allBooks,
  editBook,
  findBook,
  lendBook,
  removeBook,
} from "../services/booksServices.js";
import HttpError from "../helpers/HttpError.js";
import { addBookSchema, editBookSchema } from "../schemas/booksSchmas.js";

export const getAllBooks = async (_, res, next) => {
  try {
    const result = await allBooks();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const addNewBook = async (req, res, next) => {
  try {
    const { error } = addBookSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addBook(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { error } = editBookSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { isbn } = req.params;
    const result = await editBook(isbn, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { isbn } = req.params;
    const result = await removeBook(isbn);

    if (!result) {
      throw HttpError(404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const borrowBook = async (req, res, next) => {
  try {
    const { isbn } = req.params;
    const result = await lendBook(isbn);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const searchBook = async (req, res, next) => {
  try {
    const { isbn } = req.params;
    const result = await findBook(isbn);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

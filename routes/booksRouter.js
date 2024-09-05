import express from "express";
import {
  addNewBook,
  borrowBook,
  deleteBook,
  getAllBooks,
  searchBook,
  updateBook,
} from "../controllers/booksControllers.js";

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);

booksRouter.post("/", addNewBook);

booksRouter.put("/:isbn", updateBook);

booksRouter.delete("/:isbn", deleteBook);

booksRouter.patch("/:isbn/borrow", borrowBook);

booksRouter.get("/search", searchBook);

export default booksRouter;

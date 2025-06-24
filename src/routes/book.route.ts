import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller';
import { catchAsync } from '../utils/error';

// Routers 

export const bookRouter = express.Router();

bookRouter.post('/', createBook);
bookRouter.get('/', getAllBooks);
bookRouter.get('/:bookId', catchAsync(getBookById));
bookRouter.put('/:bookId', catchAsync(updateBook));
bookRouter.delete('/:bookId', deleteBook);

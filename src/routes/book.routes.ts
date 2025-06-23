import express from 'express';
import { createBook, getAllBooks, getBookById } from '../controllers/book.controller';
import { catchAsync } from '../utils/error';

const bookRouter = express.Router();

bookRouter.post('/', createBook);
bookRouter.get('/', getAllBooks);
bookRouter.get('/:bookId', catchAsync(getBookById));

export { bookRouter };

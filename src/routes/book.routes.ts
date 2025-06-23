import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook } from '../controllers/book.controller';
import { catchAsync } from '../utils/error';

const bookRouter = express.Router();

bookRouter.post('/', catchAsync(createBook));
bookRouter.get('/', catchAsync(getAllBooks));
bookRouter.get('/:bookId', catchAsync(getBookById));
bookRouter.patch('/:bookId', catchAsync(updateBook));

export { bookRouter };

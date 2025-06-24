import express from 'express';
import { borrowBook, borrowSummary } from '../controllers/borrow.controller';
import { catchAsync } from '../utils/error';

export const borrowRouter = express.Router();
borrowRouter.post('/', catchAsync(borrowBook));
borrowRouter.get('/', borrowSummary);

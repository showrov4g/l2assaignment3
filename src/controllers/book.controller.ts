import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';
// create book data 
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: 'Book created', data: book });
  } catch (err) {
    next(err);
  }
};
// get all book data 
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, message: 'Books fetched', data: books });
  } catch (err) {
    next(err);
  }
};
// get book by id 
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};
// update book data  

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book updated successfully', data: book });
  } catch (err) {
    next(err);
  }
};

// book data delete 

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (err) {
    next(err);
  }
};
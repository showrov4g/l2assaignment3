import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

// create post 
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: 'Book created successfully', data: book });
  } catch (err) {
    next(err);
  }
};

// get all the books data 

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string));
    res.json({ success: true, message: 'Books retrieved successfully', data: books });
  } catch (err) {
    next(err);
  }
};
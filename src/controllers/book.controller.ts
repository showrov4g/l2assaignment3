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
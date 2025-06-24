import { Request, Response, NextFunction } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';

// book borrow function 
export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const bookDoc = await Book.findById(book);
    if (!bookDoc) return res.status(404).json({ success: false, message: 'Book not found' });

    if (bookDoc.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough copies available',
      });
    }

    const borrow = await Borrow.create({ book, quantity, dueDate });

    const newCopies = bookDoc.copies - quantity;
    await Book.updateAvailability(book, newCopies);

    res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
  } catch (err) {
    next(err);
  }
};


// borrow book summary 

export const borrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      {
        $unwind: '$bookInfo',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({ success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
  } catch (err) {
    next(err);
  }
};

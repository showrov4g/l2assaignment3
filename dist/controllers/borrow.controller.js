"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
// book borrow function 
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const bookDoc = yield book_model_1.Book.findById(book);
        if (!bookDoc)
            return res.status(404).json({ success: false, message: 'Book not found' });
        if (bookDoc.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available',
            });
        }
        const borrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
        const newCopies = bookDoc.copies - quantity;
        yield book_model_1.Book.updateAvailability(book, newCopies);
        res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    }
    catch (err) {
        next(err);
    }
});
exports.borrowBook = borrowBook;
// borrow book summary 
const borrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (err) {
        next(err);
    }
});
exports.borrowSummary = borrowSummary;

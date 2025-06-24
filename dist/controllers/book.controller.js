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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
// create book 
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    }
    catch (err) {
        next(err);
    }
});
exports.createBook = createBook;
//  get all book 
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = filter ? { genre: filter } : {};
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit));
        res.json({ success: true, message: 'Books retrieved successfully', data: books });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBooks = getAllBooks;
// get all book by id 
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (err) {
        next(err);
    }
});
exports.getBookById = getBookById;
// update book data 
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, message: 'Book updated successfully', data: book });
    }
    catch (err) {
        next(err);
    }
});
exports.updateBook = updateBook;
// delete book data 
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        res.json({ success: true, message: 'Book deleted successfully', data: null });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBook = deleteBook;

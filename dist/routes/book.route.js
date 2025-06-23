"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post('/', book_controller_1.createBook);
exports.bookRouter.get('/', book_controller_1.getAllBooks);
exports.bookRouter.get('/:bookId', book_controller_1.getBookById);
// bookRouter.put('/:bookId', updateBook);
// bookRouter.delete('/:bookId', deleteBook);

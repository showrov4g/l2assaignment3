"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const error_1 = require("../utils/error");
// Routers 
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post('/', book_controller_1.createBook);
exports.bookRouter.get('/', book_controller_1.getAllBooks);
exports.bookRouter.get('/:bookId', (0, error_1.catchAsync)(book_controller_1.getBookById));
exports.bookRouter.patch('/:bookId', (0, error_1.catchAsync)(book_controller_1.updateBook));
exports.bookRouter.delete('/:bookId', book_controller_1.deleteBook);

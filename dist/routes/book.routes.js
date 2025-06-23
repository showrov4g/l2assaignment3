"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const error_1 = require("../utils/error");
const bookRouter = express_1.default.Router();
exports.bookRouter = bookRouter;
bookRouter.post('/', (0, error_1.catchAsync)(book_controller_1.createBook));
bookRouter.get('/', (0, error_1.catchAsync)(book_controller_1.getAllBooks));
bookRouter.get('/:bookId', (0, error_1.catchAsync)(book_controller_1.getBookById));
bookRouter.patch('/:bookId', (0, error_1.catchAsync)(book_controller_1.updateBook));
bookRouter.delete('/:bookId', (0, error_1.catchAsync)(book_controller_1.deleteBook));

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = require("./routes/book.route");
const borrow_route_1 = require("./routes/borrow.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API routes
app.use('/api/books', book_route_1.bookRouter);
app.use('/api/borrow', borrow_route_1.borrowRouter);
// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message || 'Something went wrong',
        success: false,
        error: err,
    });
});
// Connect to MongoDB and start server
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://learning:7CZIO6IRQ7D63BZ4@cluster0.23lvn.mongodb.net/advance-to-do-app?retryWrites=true&w=majority&appName=Cluster0');
        app.listen(5000, () => console.log('Server running on port 5000'));
    }
    catch (err) {
        console.error('Connection error', err);
    }
});
main();

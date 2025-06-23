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
const book_routes_1 = require("./routes/book.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes 
app.use('/api/books', book_routes_1.bookRouter);
app.get('/', (req, res) => {
    res.send('Library API is running...');
});
// handles errors
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/library');
        console.log('MongoDB connected');
        app.listen(5000, () => {
            console.log(' Server is running on port 5000');
        });
    }
    catch (err) {
        console.error(' Failed to connect MongoDB', err);
    }
});
start();

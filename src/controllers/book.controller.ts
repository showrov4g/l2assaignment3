
import express, { Request, Response } from "express"
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    } catch (error) {
        console.log(error)
    }
});

bookRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query: any = filter ? { genre: filter } : {};
        const books = await Book.find(query)
            .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit as string));
        res.json({ success: true, message: 'Books retrieved successfully', data: books });
    } catch (error) {
        console.log(error)
    }
})




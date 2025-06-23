import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { bookRouter } from './routes/book.routes';

const app = express();

app.use(cors());
app.use(express.json());

// routes 
app.use('/api/books', bookRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Library API is running...');
});

// handles errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/library');
    console.log('MongoDB connected');
    app.listen(5000, () => {
      console.log(' Server is running on port 5000');
    });
  } catch (err) {
    console.error(' Failed to connect MongoDB', err);
  }
};

start();

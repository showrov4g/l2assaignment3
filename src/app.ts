import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { bookRouter } from './routes/book.route';

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/books', bookRouter);

// app.use('/api/borrow');
// error handling 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message || 'Something went wrong',
    success: false,
    error: err,
  });
});

// Connect to MongoDB and start server
const main = async () => {
  try {
    await mongoose.connect('mongodb+srv://learning:7CZIO6IRQ7D63BZ4@cluster0.23lvn.mongodb.net/advance-to-do-app?retryWrites=true&w=majority&appName=Cluster0');
    app.listen(5000, () => console.log('Server running on port 5000'));
    console.log("database connected")
  } catch (error) {
    console.error('Connection error', error);
  }
};

main();

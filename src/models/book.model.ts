import { Schema, model, Model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

// book model create 
interface BookModel extends Model<IBook> {
  updateAvailability(id: string, newCopies: number): Promise<void>;
}

// book Schema 
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// pre function build 
bookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});

// statics method 
bookSchema.statics.updateAvailability = async function (
  id: string,
  newCopies: number
) {
  await this.findByIdAndUpdate(id, {
    copies: newCopies,
    available: newCopies > 0,
  });
};

// model export 
export const Book = model<IBook, BookModel>('Book', bookSchema);

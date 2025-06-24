# 📚 Library Management API

A robust and scalable **Library Management System** built using **Express.js**, **TypeScript**, and **MongoDB** with **Mongoose**. This backend handles book inventory, borrowing logic, and provides powerful filtering and aggregation features.

---

## 🚀 Features

- 📖 Create, update, delete, and retrieve books
- 🔍 Filter & sort books by genre, date, etc.
- 📦 Borrow book copies with inventory logic
- 📊 Borrow summary using MongoDB Aggregation
- ✅ Input validation, error handling, and data integrity
- ⚙️ Written in TypeScript for type safety

---

## 📁 Project Structure

src/
├── app.ts # Express app (exported)
├── server.ts # For Render deployment (with app.listen)
├── models/ # Mongoose schemas
├── routes/ # Express route handlers
├── interfaces/ # TypeScript interfaces
├── middlewares/ # Error handlers
├── utils/ # sendResponse helper
api/
└── index.ts # Vercel serverless entry point



---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/showrov4g/l2assaignment3

2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Environment Variables
Create a .env file:

env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/library
🧪 Local Development
Use ts-node-dev for hot reload:

bash
Copy
Edit
npm run dev
🔨 Build & Run for Production
bash
Copy
Edit
npm run build
npm start
🌐 API Endpoints
📚 Book Routes
Method	Endpoint	Description
POST	/api/books	Create a book
GET	/api/books	Get all books
GET	/api/books/:bookId	Get a book by ID
PATCH	/api/books/:bookId	Update a book
DELETE	/api/books/:bookId	Delete a book

🔎 Supports: ?filter, ?sortBy, ?sort, ?limit

📦 Borrow Routes
Method	Endpoint	Description
POST	/api/borrow	Borrow books with quantity & due date
GET	/api/borrow	Aggregated borrow summary

❗ Error Response Format
json
Copy
Edit
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    ...
  }
}
☁️ Deployment
✅ Render (Recommended for Backend)
Push code to GitHub

Go to render.com, create a new web service

Set:

Build Command: npm run build

Start Command: npm start

Environment Variable: MONGODB_URI

⚠️ Vercel (Advanced Serverless)
To run on Vercel, follow this structure:

Export app from src/app.ts (don’t call app.listen)

Create api/index.ts to wrap Express in a Vercel function

Add vercel.json:

json
Copy
Edit
{
  "version": 2,
  "builds": [{ "src": "api/index.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/api/index.ts" }]
}
Then deploy with:

bash
Copy
Edit
vercel --prod
👨‍💻 Author
Made with ❤️ by Showrov Ghosh

📄 License
This project is for learning purposes. Free to use in portfolios and educational use.

yaml
Copy
Edit

---

Would you like me to:
- Generate a matching `.gitignore`, `.env.example`, or `vercel.json` file?
- Prepare a `frontend` folder and connect it to this backend?

Let me know — I’ll get it ready right away! ✅

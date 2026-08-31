import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Prevents React frontend CORS errors

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI environment variable is not set');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET environment variable is not set');
  process.exit(1);
}

// Mount Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => {
    console.log('MongoDB Connected successfully');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

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
app.use('/api/auth', require('./routes/authRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected successfully');
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables first
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Prevents React frontend CORS errors

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected for PFM Dashboard');
    // Start server only after database connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`PFM Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
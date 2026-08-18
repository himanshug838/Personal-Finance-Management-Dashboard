import mongoose from 'mongoose';

/**
 * Middleware to verify MongoDB database connection before processing requests.
 */
const checkDbConnection = (req, res, next) => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: 'Database connection error. Please connect to MongoDB and try again.'
    });
  }
  next();
};

export default checkDbConnection;

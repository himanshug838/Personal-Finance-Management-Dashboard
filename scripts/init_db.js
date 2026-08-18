import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { User, Account, Transaction } from '../models/index.js';

async function initDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pfm_dashboard';
  console.log('Connecting to MongoDB:', mongoUri);

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully!');

    // Initialize collections & indexes for all 3 models
    await User.createIndexes();
    console.log('Collection initialized: users');

    await Account.createIndexes();
    console.log('Collection initialized: accounts');

    await Transaction.createIndexes();
    console.log('Collection initialized: transactions');

    // List collections in the database to verify
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n--- MongoDB Database Collections in pfm_dashboard ---');
    collections.forEach((col) => console.log(` - ${col.name}`));

    console.log('\nDatabase models for User, Account, and Transaction are fully ready in MongoDB!');
    process.exit(0);
  } catch (err) {
    console.error('Database Initialization Error:', err);
    process.exit(1);
  }
}

initDatabase();

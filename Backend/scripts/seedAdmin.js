import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

/**
 * Script to create or promote an Admin user in MongoDB.
 * Usage: node scripts/seedAdmin.js <email>
 * If no email provided, defaults to creating admin@pfm.com with password 'admin123456'.
 */
async function seedAdmin() {
  const targetEmail = process.argv[2] || 'admin@pfm.com';
  const defaultPassword = 'admin123456';
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pfm_dashboard';

  console.log(`Connecting to MongoDB: ${mongoUri}`);

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully!');

    let user = await User.findOne({ email: targetEmail.toLowerCase() });

    if (user) {
      user.role = 'admin';
      await user.save();
      console.log(`\n✅ Success! User ${user.email} has been promoted to ADMIN role.`);
    } else {
      user = new User({
        firstName: 'System',
        lastName: 'Admin',
        email: targetEmail.toLowerCase(),
        password: defaultPassword,
        role: 'admin',
      });
      await user.save();
      console.log(`\n✅ Success! Created new Admin Account:`);
      console.log(` - Email: ${user.email}`);
      console.log(` - Password: ${defaultPassword}`);
      console.log(` - Role: ${user.role}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Seed Admin Error:', err);
    process.exit(1);
  }
}

seedAdmin();

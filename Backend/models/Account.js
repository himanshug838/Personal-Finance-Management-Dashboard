import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Account name is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Account type is required'],
      enum: {
        values: ['checking', 'savings', 'credit_card', 'investment', 'loan', 'cash', 'other'],
        message: '{VALUE} is not a valid account type',
      },
      default: 'checking',
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      default: 0.0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      trim: true,
    },
    accountNumberLast4: {
      type: String,
      trim: true,
      maxLength: 4,
    },
    institutionName: {
      type: String,
      default: 'Manual Account',
      trim: true,
    },
    plaidAccountId: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#10b981', // Emerald theme color
    },
  },
  { timestamps: true }
);

// Index for fast query filtering by user and active status
AccountSchema.index({ userId: 1, isActive: 1 });

export default mongoose.model('Account', AccountSchema);

import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Account ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Transaction title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be positive'],
    },
    type: {
      type: String,
      required: [true, 'Transaction type is required'],
      enum: {
        values: ['expense', 'income', 'transfer'],
        message: '{VALUE} is not a valid transaction type',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Housing & Utilities',
        'Food & Groceries',
        'Transportation',
        'Entertainment & Leisure',
        'Salary & Income',
        'Investments',
        'Health & Medical',
        'Shopping',
        'Personal Care',
        'Education',
        'Subscriptions',
        'Transfer',
        'Other',
      ],
      default: 'Other',
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    merchant: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'cancelled'],
      default: 'completed',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

// Compound index for timeline queries per user
TransactionSchema.index({ userId: 1, date: -1 });
// Compound index for account transaction history
TransactionSchema.index({ accountId: 1, date: -1 });

export default mongoose.model('Transaction', TransactionSchema);

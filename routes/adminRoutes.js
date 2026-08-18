import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import checkDbConnection from '../middleware/dbCheckMiddleware.js';

// Protect all admin routes with Database Check, Auth, and Admin Role check
router.use(checkDbConnection);
router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * GET /api/admin/stats
 * Platform-wide statistics overview
 */
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalAccounts = await Account.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    // Get 5 most recently registered users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    res.json({
      stats: {
        totalUsers,
        totalAdmins,
        totalAccounts,
        totalTransactions,
      },
      recentUsers,
    });
  } catch (err) {
    console.error('Fetch Admin Stats Error:', err);
    res.status(500).json({ error: 'Server error fetching platform statistics' });
  }
});

/**
 * GET /api/admin/users
 * List all users with search and filter capabilities
 */
router.get('/users', async (req, res) => {
  try {
    const { search, role } = req.query;
    const query = {};

    if (role && ['user', 'admin'].includes(role)) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .select('-password');

    res.json({ users });
  } catch (err) {
    console.error('Fetch Admin Users Error:', err);
    res.status(500).json({ error: 'Server error fetching user list' });
  }
});

/**
 * PUT /api/admin/users/:id/role
 * Change a user's role (promote to admin / demote to user)
 */
router.put('/users/:id/role', async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Role must be "user" or "admin".' });
    }

    // Prevent demoting oneself
    if (targetUserId === req.user.userId && role !== 'admin') {
      return res.status(400).json({ error: 'You cannot demote your own admin account.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      targetUserId,
      { role },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: `User role updated to ${role} successfully`,
      user: updatedUser,
    });
  } catch (err) {
    console.error('Update Role Error:', err);
    res.status(500).json({ error: 'Server error updating user role' });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Delete a user and purge all associated financial data
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const targetUserId = req.params.id;

    // Prevent deleting oneself
    if (targetUserId === req.user.userId) {
      return res.status(400).json({ error: 'You cannot delete your own admin account.' });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Purge associated accounts and transactions from MongoDB
    await Account.deleteMany({ userId: targetUserId });
    await Transaction.deleteMany({ userId: targetUserId });
    await User.findByIdAndDelete(targetUserId);

    res.json({
      message: `User ${targetUser.email} and all associated data have been deleted successfully.`,
    });
  } catch (err) {
    console.error('Delete User Error:', err);
    res.status(500).json({ error: 'Server error deleting user account' });
  }
});

export default router;

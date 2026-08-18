import User from '../models/user.js';

/**
 * Middleware to verify that the logged-in user has Admin privileges.
 * Must be placed after authMiddleware.
 */
const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Unauthorized. Authentication required.' });
    }

    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin rights required.' });
    }

    req.adminUser = user;
    next();
  } catch (err) {
    console.error('Admin Middleware Error:', err);
    res.status(500).json({ error: 'Server error verifying admin status' });
  }
};

export default adminMiddleware;

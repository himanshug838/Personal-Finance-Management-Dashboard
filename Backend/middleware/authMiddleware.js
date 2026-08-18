import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  // Get token from Authorization header: "Bearer <token>"
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded; // Contains userId
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
};

// lib/adminAuth.js
import { verifyToken } from './auth';
import prisma from './prisma';

export const adminAuth = (handler) => async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error('Not authenticated');

    const decoded = verifyToken(token);
    const admin = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!admin || admin.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Access is denied.' });
    }

    req.admin = admin; // Attach admin user to the request object
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};
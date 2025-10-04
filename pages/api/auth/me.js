import prisma from '../../../lib/prisma';
import { verifyToken } from '../../../lib/auth';
import cookie from 'cookie';

export default async function handler(req, res) {
  try {
    const { token } = cookie.parse(req.headers.cookie || '');
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      // IMPORTANT: Include the related application data
      include: {
        application: true,
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const { password, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);

  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
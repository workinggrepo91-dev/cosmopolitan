// pages/api/admin/applications/index.js
import prisma from '../../../../lib/prisma';
import { adminAuth } from '../../../../lib/adminAuth';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const applications = await prisma.application.findMany({
    include: {
      user: { // Include the applicant's name
        select: { name: true },
      },
    },
    orderBy: {
      submissionDate: 'desc',
    },
  });

  res.status(200).json(applications);
}

export default adminAuth(handler); // Wrap the handler with admin security
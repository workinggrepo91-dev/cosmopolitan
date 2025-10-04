import prisma from '../../../../lib/prisma';
import { adminAuth } from '../../../../lib/adminAuth';

// This is our State Machine: it defines the workflow rules.
const workflow = {
  'Submitted': 'Initial Review',
  'Initial Review': 'In-Depth Review',
  'In-Depth Review': 'Approved',
  'Approved': 'Funded',
};

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { action } = req.body; // We now receive an 'action'

  if (!action) {
    return res.status(400).json({ error: 'Action is required.' });
  }

  try {
    // 1. Get the application's current status from the database
    const currentApplication = await prisma.application.findUnique({ where: { id } });
    if (!currentApplication) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    
    const currentStatus = currentApplication.status;
    let newStatus = currentStatus;

    // 2. Determine the new status based on the action and workflow
    if (action === 'advance') {
      const nextStage = workflow[currentStatus];
      if (nextStage) {
        newStatus = nextStage;
      } else {
        // If there is no next stage, do nothing or return an error
        return res.status(400).json({ error: 'Application is already at the final stage.' });
      }
    } else if (action === 'reject') {
      newStatus = 'Rejected';
    } else {
      return res.status(400).json({ error: 'Invalid action.' });
    }

    // 3. Update the application with the new, correct status
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status: newStatus },
    });

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application.' });
  }
}

export default adminAuth(handler);
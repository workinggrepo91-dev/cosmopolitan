import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth';
import { Prisma } from '@prisma/client';

export default async function handler(req, res) {
  // We are no longer using formidable, so we can use the default body parser
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name, email, password, country, address,
      projectTitle, projectSummary, fundingAmount,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          country,
          address,
          // idCard is now omitted
        },
      });

      await tx.application.create({
        data: {
          projectTitle,
          projectSummary,
          fundingAmount: parseFloat(fundingAmount),
          projectProposalFile: 'not_uploaded', // Use a placeholder
          userId: user.id,
        },
      });

      return user;
    });

    const token = signToken(newUser);
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`);
    return res.status(201).json({ message: 'Application submitted successfully!' });

  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }
    return res.status(500).json({ error: e.message || 'An internal server error occurred.' });
  }
}
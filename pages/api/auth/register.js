import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import formidable from 'formidable';
import path from 'path';
import { signToken } from '../../../lib/auth';
import { Prisma } from '@prisma/client';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    multiples: true,
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const getField = (name) => Array.isArray(fields[name]) ? fields[name][0] : fields[name];
    const getFile = (name) => Array.isArray(files[name]) ? files[name][0] : files[name];

    const hashedPassword = await bcrypt.hash(getField('password'), 10);
    const idCard = getFile('idCard');
    const projectProposalFile = getFile('projectProposalFile');

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: getField('name'),
          email: getField('email'),
          password: hashedPassword,
          country: getField('country'),
          address: getField('address'),
          idCard: idCard ? `/uploads/${path.basename(idCard.filepath)}` : null,
        },
      });

      await tx.application.create({
        data: {
          projectTitle: getField('projectTitle'),
          projectSummary: getField('projectSummary'),
          fundingAmount: parseFloat(getField('fundingAmount')),
          projectProposalFile: projectProposalFile ? `/uploads/${path.basename(projectProposalFile.filepath)}` : null,
          userId: user.id,
        },
      });

      return user;
    });

    const token = signToken(newUser);
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`);
    return res.status(201).json({ message: 'Application submitted successfully!' });

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = signToken(user)
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800`)
    return res.json({ message: 'Login successful' })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
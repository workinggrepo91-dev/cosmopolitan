import jwt from 'jsonwebtoken'

export function signToken(user) {
  const payload = { id: user.id, email: user.email }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  if (!token) throw new Error('No token provided')
  return jwt.verify(token, process.env.JWT_SECRET)
}
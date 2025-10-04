import cookie from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set a new cookie with the same name, but with an expiry date in the past.
  // This effectively tells the browser to delete the cookie.
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0), // Set expiry date to the past
    sameSite: 'strict',
    path: '/',
  }));

  res.status(200).json({ message: 'Successfully logged out' });
}
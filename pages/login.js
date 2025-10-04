import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed.');
      }
      
      // On successful login, check the user's role and redirect
      const userRes = await fetch('/api/auth/me');
      const userData = await userRes.json();
      
      if (userData.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Image and Quote */}
      <div className="hidden lg:flex w-1/2 bg-primary-600 relative items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070')" }}
        ></div>
        <div className="relative text-white text-center p-12">
          <h1 className="text-4xl font-bold mb-4">"The future is built by those who believe in the power of a single idea."</h1>
          <p className="text-lg">Welcome back to Cosmopolitan grant.</p>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition">
              &larr; Back to Home
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-primary-700 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-8">Please sign in to your account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-primary-600 focus:border-primary-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-primary-600 focus:border-primary-600"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold">
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-primary-600 hover:underline">
              Apply now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
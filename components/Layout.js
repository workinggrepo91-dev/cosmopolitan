import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    // Fetch user data to check their role
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-md hidden md:block flex flex-col">
        <div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary-700">Global Support</h1>
          </div>
          <nav className="mt-6">
            {/* Home Link */}
            <Link href="/" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors">
              Home
            </Link>
            
            {/* Conditional Links for Admins */}
            {user && user.role === 'ADMIN' && (
              <>
                <Link href="/admin/dashboard" className={`flex items-center px-6 py-3 transition-colors ${
                  pathname === '/admin/dashboard' ? 'bg-primary-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                  Admin Dashboard
                </Link>
                <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors">
                  User View
                </Link>
              </>
            )}

            {/* Links for Regular Users */}
            {user && user.role === 'USER' && (
              <>
                <Link href="/dashboard" className={`flex items-center px-6 py-3 transition-colors ${
                  pathname === '/dashboard' ? 'bg-primary-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                  Dashboard
                </Link>
                 <Link href="/profile" className={`flex items-center px-6 py-3 transition-colors ${
                  pathname === '/profile' ? 'bg-primary-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                  Profile
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
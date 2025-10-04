import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Helper component for colored status badges
const StatusBadge = ({ status }) => {
  const styles = {
    'Submitted': 'bg-blue-100 text-blue-800',
    'Initial Review': 'bg-yellow-100 text-yellow-800',
    'In-Depth Review': 'bg-yellow-100 text-yellow-800',
    'Action Required': 'bg-red-100 text-red-800',
    'Approved': 'bg-green-100 text-green-800',
    'Funded': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
  };
  return <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${styles[status] || 'bg-gray-100'}`}>{status}</span>;
};

// Main Dashboard Component
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading your dashboard...</div>;
  }
  
  if (!user) return null;

  const { name, application } = user;
  const progressSteps = ['Submitted', 'Initial Review', 'In-Depth Review', 'Approved', 'Funded'];
  const currentStepIndex = progressSteps.indexOf(application?.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-primary-700">
            <Link href="/">Global Support Funds</Link>
          </div>
          <nav className="flex items-center space-x-6">
            {user.role === 'ADMIN' && (
              <Link href="/admin/dashboard" className="text-sm font-semibold text-primary-600 hover:underline">
                Admin View
              </Link>
            )}
            <Link href="/profile" className="text-sm font-semibold text-gray-600 hover:text-primary-600">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-600 hover:text-primary-600"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {name}!</h1>
            <p className="text-gray-600 mt-1">Track the progress of your grant application below.</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            {!application ? (
              <p className="text-center text-gray-600">You have not submitted an application yet.</p>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary-700">{application.projectTitle}</h2>
                    <p className="text-gray-500 text-sm mt-1">Submitted on: {new Date(application.submissionDate).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <StatusBadge status={application.status} />
                  </div>
                </div>

                {/* Dynamic Progress Tracker */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-5">Your Application Journey</h3>
                  <div className="flex items-center">
                    {progressSteps.map((step, index) => (
                      <div key={step} className="flex items-center w-full">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors duration-500 ${index <= currentStepIndex ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          {index <= currentStepIndex ? '✔' : index + 1}
                        </div>
                        {index < progressSteps.length - 1 && (
                          <div className={`flex-1 h-1 transition-colors duration-500 ${index < currentStepIndex ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-500 font-medium">
                    {progressSteps.map(step => (
                      <span key={step} className="w-1/5 text-center">{step}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
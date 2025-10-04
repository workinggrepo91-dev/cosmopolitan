import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const router = useRouter();

    const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) router.push('/login');
        throw new Error('Failed to fetch applications');
      }
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id, action) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchApplications();
    } catch (err) {
      alert(err.message);
    }
  };

  // Memoized calculations for stats and filtering
  const filteredApplications = useMemo(() => {
    return applications
      .filter(app => filterStatus === 'All' || app.status === filterStatus)
      .filter(app => 
        app.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [applications, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: applications.length,
    pending: applications.filter(app => ['Submitted', 'Initial Review', 'In-Depth Review'].includes(app.status)).length,
    approved: applications.filter(app => app.status === 'Approved').length,
    funded: applications.filter(app => app.status === 'Funded').length,
  }), [applications]);
  
  const getNextStage = (currentStatus) => {
    const workflow = {
      'Submitted': 'Initial Review',
      'Initial Review': 'In-Depth Review',
      'In-Depth Review': 'Approved',
      'Approved': 'Funded',
    };
    return workflow[currentStatus] || null;
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar (from Layout component) */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* New Header with Navigation */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary-700">Admin Dashboard</h1>
            <p className="text-gray-600">Manage and track all grant applications.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition">
              User View
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">📊</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">⏳</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-3xl font-bold text-gray-800">{stats.approved}</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-full">✅</div>
          </div>
           <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Funded</p>
              <p className="text-3xl font-bold text-gray-800">{stats.funded}</p>
            </div>
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">💰</div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white p-4 rounded-xl shadow-lg mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input 
            type="text"
            placeholder="Search by applicant or project..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:flex-1 border border-gray-300 rounded-md p-2"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md p-2"
          >
            <option>All</option>
            <option>Submitted</option>
            <option>Initial Review</option>
            <option>In-Depth Review</option>
            <option>Approved</option>
            <option>Funded</option>
            <option>Rejected</option>
          </select>
        </div>
        
        {/* Applications Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-800 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Applicant</th>
                  <th scope="col" className="px-6 py-3">Project Title</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{app.user.name}</td>
                    <td className="px-6 py-4">{app.projectTitle}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 font-semibold text-xs rounded-full ${
                        app.status === 'Approved' || app.status === 'Funded' ? 'bg-green-100 text-green-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                       {getNextStage(app.status) && (
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'advance')}
                          className="font-medium text-white bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded-md transition"
                        >
                          Advance
                        </button>
                      )}
                      {app.status !== 'Rejected' && app.status !== 'Funded' && (
                         <button
                           onClick={() => handleUpdateStatus(app.id, 'reject')}
                           className="font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition"
                         >
                           Reject
                         </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredApplications.length === 0 && <p className="text-center text-gray-500 py-8">No applications match your criteria.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
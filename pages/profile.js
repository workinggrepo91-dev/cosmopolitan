import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    address: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch current user data
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setFormData({
          name: data.name || '',
          country: data.country || '',
          address: data.address || '',
          newPassword: '',
          confirmPassword: '',
        });
        setLoading(false);
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    const handleCancel = () => {
    router.back(); // Navigates to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }


    try {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile.');
      
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (loading) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-700">Your Profile</h1>
          <p className="text-gray-600">Update your personal information and password.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          {/* Personal Information Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Leave blank to keep current password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
            </div>
          </div>

          <div className="pt-4">
             <div className="pt-4 flex items-center space-x-4">
            <button
              type="button" // Use type="button" to prevent form submission
              onClick={handleCancel}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition"
            >
              Save Changes
            </button>
          </div>
            {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
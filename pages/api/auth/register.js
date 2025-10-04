import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react'; // Import React for React.Fragment

// Helper component for styled inputs
const Input = ({ name, label, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      name={name}
      {...props}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-600 focus:border-primary-600"
    />
  </div>
);

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', country: '', address: '',
    projectTitle: '', projectSummary: '', fundingAmount: '',
  });
  const [files, setFiles] = useState({ idCard: null, projectProposalFile: null });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));
    if (files.idCard) body.append('idCard', files.idCard);
    if (files.projectProposalFile) body.append('projectProposalFile', files.projectProposalFile);

    try {
      const res = await fetch('/api/auth/register', { method: 'POST', body });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed.');
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Image and Quote */}
      <div className="hidden lg:flex w-1/2 bg-primary-600 relative items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070')" }}
        ></div>
        <div className="relative text-white text-center p-12">
          <h1 className="text-4xl font-bold mb-4">"Your vision has the power to reshape the world."</h1>
          <p className="text-lg">Join a global community of innovators.</p>
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-2xl w-full">
          <div className="mb-6">
            <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition">
              &larr; Back to Home
            </Link>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-primary-700">Grant Application</h2>
          <p className="text-center text-gray-600 mt-2 mb-8">Complete the following steps to submit your application.</p>

          {/* Stepper Navigation */}
          <div className="mb-8 p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              {['Personal Info', 'Project Details', 'Submit'].map((label, index) => (
                <React.Fragment key={label}>
                  <div className={`flex items-center ${step > index ? 'text-primary-600' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > index ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                      {index + 1}
                    </div>
                    <span className="ml-2 hidden md:inline">{label}</span>
                  </div>
                  {index < 2 && <div className={`flex-1 h-1 mx-4 ${step > index + 1 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
            {step === 1 && (
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Step 1: Tell Us About Yourself</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="name" label="Full Name" value={formData.name} onChange={handleChange} required />
                  <Input name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
                  <Input name="country" label="Country of Residence" value={formData.country} onChange={handleChange} required />
                  <Input name="address" label="Full Address" value={formData.address} onChange={handleChange} required />
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Step 2: Describe Your Project</h3>
                <Input name="projectTitle" label="Project Title" value={formData.projectTitle} onChange={handleChange} required />
                <Input name="fundingAmount" label="Funding Amount Requested ($USD)" type="number" value={formData.fundingAmount} onChange={handleChange} required />
                <div>
                  <label htmlFor="projectSummary" className="block text-sm font-medium text-gray-700">Project Summary</label>
                  <textarea name="projectSummary" id="projectSummary" rows="4" value={formData.projectSummary} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-600 focus:border-primary-600"></textarea>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">Step 3: Finalize Your Account & Documents</h3>
                  <Input name="password" label="Create Password" type="password" value={formData.password} onChange={handleChange} required />
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valid ID Card</label>
                      <input type="file" name="idCard" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Proposal Document</label>
                      <input type="file" name="projectProposalFile" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                  </div>
              </section>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-between pt-6">
              <button type="button" onClick={prevStep} disabled={step === 1} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Back
              </button>
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                  Next
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:bg-primary-300">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
           <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
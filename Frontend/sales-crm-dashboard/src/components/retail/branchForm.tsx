import React, { useState } from 'react';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
import { Link, useNavigate } from 'react-router-dom';

const BranchForm: React.FC = () => {
  const [formData, setFormData] = useState({
    branchLocation: '',
    branchRegion: '',
    branchMobileNumber: '',
    branchEmail: '',
  });

  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      // Import mock data
      const mockData = await import('../../data/mock-db.json');
      const branches = mockData.branch;

      // Generate a new branch short ID
      const newBranchShortId = `BR-${branches.length + 1}`;

      // Create new branch object
      const newBranch = {
        ...formData,
        branchShortId: newBranchShortId,
        branchMobileNumber: parseInt(formData.branchMobileNumber, 10)
      };

      // In a real app, you'd send this to a backend
      setMessage('Branch created successfully');
      
      // Reset form
      setFormData({ 
        branchLocation: '', 
        branchRegion: '', 
        branchMobileNumber: '', 
        branchEmail: '' 
      });

      // Optionally navigate to branch list
      navigate('/branches');
    } catch (error) {
      console.error('Error creating branch:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create New Branch</h1>
          <Link 
            to="/branches" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            View All Branches
          </Link>
        </div>

        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {message && (
              <div className={`p-4 rounded-md text-center ${message.startsWith('Error') 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'}`}>
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Location
                </label>
                <input
                  type="text"
                  name="branchLocation"
                  value={formData.branchLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Region
                </label>
                <input
                  type="text"
                  name="branchRegion"
                  value={formData.branchRegion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Mobile Number
                </label>
                <input
                  type="tel"
                  name="branchMobileNumber"
                  value={formData.branchMobileNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Email
                </label>
                <input
                  type="email"
                  name="branchEmail"
                  value={formData.branchEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Branch
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BranchForm;
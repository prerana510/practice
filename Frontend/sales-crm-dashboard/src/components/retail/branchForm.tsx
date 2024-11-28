import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface BranchFormData {
  branchLocation: string;
  branchRegion: string;
  branchMobileNumber: string;
  branchEmail: string;
}

const BranchForm: React.FC = () => {
  const [formData, setFormData] = useState<BranchFormData>({
    branchLocation: '',
    branchRegion: '',
    branchMobileNumber: '',
    branchEmail: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const mockData = await import('../../data/mock-db.json');
      const branches = mockData.branch;
      const newBranchShortId = `BR-${branches.length + 1}`;
      const newBranch = {
        ...formData,
        branchShortId: newBranchShortId,
        branchMobileNumber: parseInt(formData.branchMobileNumber, 10)
      };

      setSubmissionStatus('Branch created successfully');
      setFormData({
        branchLocation: '',
        branchRegion: '',
        branchMobileNumber: '',
        branchEmail: ''
      });
      navigate('/branches');
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('Error creating branch. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add a Branch</h1>
          </div>

          {/* Form Container */}
          <div className="p-6">
            {/* Submission Status Message */}
            {submissionStatus && (
              <div 
                className={`mb-4 p-4 rounded-lg text-center font-semibold ${
                  submissionStatus.includes('successfully') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {submissionStatus}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="branchLocation"
                  value={formData.branchLocation}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter branch location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Branch Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <input
                  type="text"
                  name="branchRegion"
                  value={formData.branchRegion}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter branch region"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Branch Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="branchMobileNumber"
                  value={formData.branchMobileNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (123) 456-7890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Branch Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="branchEmail"
                  value={formData.branchEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="branch@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex justify-between mt-6">
                <button 
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                  hover:bg-indigo-700 transition-colors duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed 
                  flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <svg 
                      className="animate-spin h-5 w-5 mr-2" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  <span>Add Branch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchForm;
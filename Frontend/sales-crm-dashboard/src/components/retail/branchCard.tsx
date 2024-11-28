import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
import { Link } from 'react-router-dom';
import { Store, MapPin, Globe, Phone, Mail } from 'lucide-react';

interface Branch {
  branchShortId: string;
  branchLocation: string;
  branchRegion: string;
  branchMobileNumber: number;
  branchEmail: string;
}

const BranchCards: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const mockData = await import('../../data/mock-db.json');
        const branchesData = mockData.branch;
        setBranches(branchesData);
        setFilteredBranches(branchesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    const filtered = branches.filter(
      (branch) =>
        branch.branchLocation.toLowerCase().includes(searchQuery) ||
        branch.branchShortId.toLowerCase().includes(searchQuery)
    );
    setFilteredBranches(filtered);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-indigo-600 text-lg">Loading branches...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 text-center rounded-lg mx-4">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Branch Overview */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Branch Overview</h1>
          </div>

          {/* Search and Add Branch Controls */}
          <div className="p-6 pb-0 flex justify-between items-center">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search branches by location or ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute right-3 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <Link
              to="/retail/branchForm"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Branch</span>
            </Link>
          </div>

          {/* Branch Cards */}
          <div className="p-6">
            {filteredBranches.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No branches found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBranches.map((branch) => (
                  <div
                    key={branch.branchShortId}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-indigo-600">
                          {branch.branchShortId}
                        </h3>
                        <Store className="w-6 h-6 text-indigo-600" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">{branch.branchLocation}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">{branch.branchRegion}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">{branch.branchMobileNumber}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">{branch.branchEmail}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCards;
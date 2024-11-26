import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/crm/DashboardLayout';
import { Link } from 'react-router-dom';
import LucideIcons from 'lucide-react';

// Access components like:
const Building2 = LucideIcons.Building2;
const MapPin = LucideIcons.MapPin;
const Phone = LucideIcons.Phone;
const Mail = LucideIcons.Mail;
const Search = LucideIcons.Search;

// Interface for the branch object
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

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    // Filter branches based on search term
    const filtered = branches.filter(
      (branch) =>
        branch.branchLocation.toLowerCase().includes(searchQuery) ||
        branch.branchShortId.toLowerCase().includes(searchQuery)
    );
    setFilteredBranches(filtered);
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="text-indigo-600 text-lg">Loading branches...</div>
      </div>
    </DashboardLayout>
  );

  if (error || branches.length === 0) return (
    <DashboardLayout>
      <div className={`p-4 ${error ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-700'} text-center rounded-lg mx-4`}>
        {error || 'No branches found.'}
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Branches of Pai International
          </h1>
          <Link 
            to="/branches/new" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add New Branch
          </Link>
        </div>

        {/* Search input */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search branches by location or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {filteredBranches.length === 0 ? (
          <div className="text-center py-12 bg-gray-100 rounded-md">
            <p className="text-xl text-gray-600">No branches found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <div 
                key={branch.branchShortId} 
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-indigo-600">
                      Branch ID: {branch.branchShortId}
                    </h3>
                    <Building2 className="text-gray-400" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="mr-3 text-gray-500" size={20} />
                      <span>{branch.branchLocation}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-3 text-gray-500" size={20} />
                      <span>{branch.branchRegion}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-3 text-gray-500" size={20} />
                      <span>{branch.branchMobileNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-3 text-gray-500" size={20} />
                      <span>{branch.branchEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BranchCards;
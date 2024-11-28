import React from 'react';
import { Link } from 'react-router-dom';
import { Server } from 'lucide-react';

interface TopbarProps {
  homePage?: boolean;
  showNavLinks?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ 
  homePage = false,
  showNavLinks = true 
}) => {
  return (
    <header 
      className={`
        h-16 fixed top-0 left-0 right-0 z-50
        ${homePage 
          ? 'bg-transparent' 
          : 'bg-white border-b border-gray-200 shadow-sm'}
      `}
    >
      <div className="max-w-7xl mx-auto h-full px-6">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Title */}
          <Link 
            to="/" 
            className={`flex items-center space-x-3 ${homePage ? 'text-white' : 'text-gray-800'}`}
          >
            <Server 
              className={`w-6 h-6 ${
                homePage ? 'text-white' : 'text-indigo-600'
              }`}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Sales ERP
            </span>
          </Link>

          {/* Navigation Links */}
          {showNavLinks && (
            <nav className="flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link 
                to="/retail/branches" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Branches
              </Link>
              <Link 
                to="/retail/customers" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Customers
              </Link>
              
              {/* Profile/Account Button */}
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition-colors duration-200"
              >
                Account
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};


export default Topbar;
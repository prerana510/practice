import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Server
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const roleName = sessionStorage.getItem('username') || 'User';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 w-full fixed left-0 z-40 pl-64">
      <div className="flex justify-between items-center h-16 px-6">
        {/* Left side with logo and welcome message */}
        <div className="flex items-center space-x-6">
          
          <div className="h-6 w-px bg-gray-200"></div>
          <div className="flex items-center">
            <User className="w-5 h-5 text-indigo-600 mr-3" />
            <h1 className="text-sm font-medium text-gray-700">
              Welcome, {roleName.toLocaleUpperCase()}
            </h1>
          </div>
        </div>

        {/* Right side with menu */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 animate-fadeIn">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <Settings className="w-4 h-4 mr-2 text-gray-500" />
                Account Settings
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <HelpCircle className="w-4 h-4 mr-2 text-gray-500" />
                Help
              </button>
              <div className="h-px bg-gray-200 my-1"></div>
              <Link
                to="/retail/signin"
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                Log out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
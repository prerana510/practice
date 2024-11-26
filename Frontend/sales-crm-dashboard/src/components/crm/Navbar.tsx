import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LucideIcons from 'lucide-react';

// Access components like:
const User = LucideIcons.User;
const Settings = LucideIcons.Settings;
const HelpCircle = LucideIcons.HelpCircle;
const LogOut = LucideIcons.LogOut;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const roleName = sessionStorage.getItem('role');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md w-full fixed top-0 left-0 z-20 pl-20">
      <div className="flex justify-between items-center h-16 px-6">
        <div className="flex items-center">
          <User className="w-6 h-6 text-indigo-600 mr-3" />
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, {roleName?.toLocaleUpperCase() || 'User'}
          </h1>
        </div>
        <div className="relative">
          <button 
            onClick={toggleMenu} 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-indigo-50 transition-all"
          >
            <User className="w-6 h-6 text-indigo-600" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-indigo-50 transition-all">
                <Settings className="w-4 h-4 mr-2 text-gray-600" />
                Account Settings
              </button>
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-indigo-50 transition-all">
                <HelpCircle className="w-4 h-4 mr-2 text-gray-600" />
                Help
              </button>
              <Link 
                to="/retail/signin" 
                className="flex items-center w-full px-4 py-2 text-left hover:bg-indigo-50 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-600" />
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
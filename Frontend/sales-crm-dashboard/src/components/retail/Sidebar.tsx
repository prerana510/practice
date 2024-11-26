import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LucideIcons from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const role = sessionStorage.getItem('role');

  // Updated type definition to include className prop
  const SidebarItem = ({ 
    to, 
    icon: Icon, 
    label, 
    isVisible = true 
  }: { 
    to: string, 
    icon: React.ComponentType<{ className?: string }>, 
    label: string, 
    isVisible?: boolean 
  }) => {
    if (!isVisible) return null;

    return (
      <Link 
        to={to} 
        className="flex items-center p-3 hover:bg-indigo-100 rounded-lg transition-all duration-300 group"
      >
        <Icon className="w-6 h-6 text-indigo-600 mr-4" />
        {isExpanded && (
          <span className="text-gray-800 font-medium group-hover:text-indigo-700">
            {label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div 
      className={`
        ${isExpanded ? 'w-64' : 'w-20'} 
        bg-white shadow-xl h-screen fixed left-0 top-0 
        transition-all duration-300 ease-in-out
        border-r border-gray-100 overflow-hidden
      `}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          {isExpanded && (
            <span className="text-xl font-bold text-indigo-600 ml-2">
              Retail CRM
            </span>
          )}
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-indigo-50 transition-all"
        >
          {isExpanded ? <LucideIcons.X className="w-6 h-6" /> : <LucideIcons.Menu className="w-6 h-6" />}
        </button>
      </div>

      <nav className="mt-6">
        <div className="space-y-2 px-2">
          <SidebarItem 
            to="/retail/main" 
            icon={LucideIcons.Home} 
            label="Home" 
          />
          <SidebarItem 
            to="/retail/branches" 
            icon={LucideIcons.Store} 
            label="Branches" 
          />
          <SidebarItem 
            to="/retail/product" 
            icon={LucideIcons.Package} 
            label="Product" 
          />
          <SidebarItem 
            to="/retail/order" 
            icon={LucideIcons.ShoppingCart} 
            label="Order Table" 
          />

          {/* Business Retailer Specific Items */}
          <SidebarItem 
            to="/retail/branchForm" 
            icon={LucideIcons.PlusCircle} 
            label="Add Branch" 
            isVisible={role === 'business_retailer'} 
          />
          <SidebarItem 
            to="/retail/register" 
            icon={LucideIcons.Users} 
            label="Register User" 
            isVisible={role === 'business_retailer'} 
          />

          {/* Branch Retailer Specific Items */}
          <SidebarItem 
            to="/retail/restock" 
            icon={LucideIcons.Package} 
            label="Restock" 
            isVisible={role === 'branch_retailer'} 
          />

          {/* Sales Rep Specific Items */}
          <SidebarItem 
            to="/retail/createOrder" 
            icon={LucideIcons.ShoppingCart} 
            label="Create Order" 
            isVisible={role === 'sales_rep'} 
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
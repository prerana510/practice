import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Store,
  ShoppingCart,
  PlusCircle,
  Users,
  UserRound,
  Package,
  Server
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const role = sessionStorage.getItem('role') || 'guest';

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
        <span className="text-gray-800 font-medium group-hover:text-indigo-700">
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div className="w-64 bg-white shadow-xl h-screen fixed left-0 top-16 border-r border-gray-100 overflow-y-auto z-30">
      <div className="p-4 flex items-center justify-between border-b">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-3">
            <Server className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Sales ERP
            </span>
          </Link>
        </div>
      </div>
      <nav className="mt-6">
        <div className="space-y-2 px-2">
          <SidebarItem to="/retail/main" icon={Home} label="Home" />
          <SidebarItem to="/retail/branches" icon={Store} label="Branches" />
          <SidebarItem to="/retail/product" icon={Package} label="Product" />
          <SidebarItem to="/retail/order" icon={ShoppingCart} label="Order Table" />
          <SidebarItem to="/retail/customer" icon={UserRound} label="Customers" />
          <SidebarItem
            to="/retail/branchForm"
            icon={PlusCircle}
            label="Add Branch"
            isVisible={role === 'business_retailer'}
          />
          <SidebarItem
            to="/retail/register"
            icon={Users}
            label="Register User"
            isVisible={role === 'business_retailer'}
          />
          <SidebarItem
            to="/retail/restock"
            icon={Package}
            label="Restock"
            isVisible={role === 'branch_retailer'}
          />
          <SidebarItem
            to="/retail/createOrder"
            icon={ShoppingCart}
            label="Create Order"
            isVisible={role === 'sales_rep'}
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
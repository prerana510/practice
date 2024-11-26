import React from 'react';
import ProductTable from '../components/retail/ProductTable';

const ProductPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Products Management</h1>
          </div>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

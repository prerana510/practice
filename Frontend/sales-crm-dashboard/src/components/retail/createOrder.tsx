import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Customer {
  customerShortId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface Product {
  productShortId: string;
  productName: string;
  sellingPrice: number;
  stockQuantity: number;
}

interface Branch {
  branchShortId: string;
  branchName: string;
}

const CreateOrder: React.FC = () => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [productShortId, setProductShortId] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const [branchShortId, setBranchShortId] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<string>('Pending');
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [orderDate, setOrderDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  /*useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    if (userRole !== 'sales_rep') {
      navigate('/not-authorized');
    }
  }, [navigate]);*/

  useEffect(() => {
    const fetchAllBranches = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/branches');
        setAllBranches(response.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
        setError('Failed to fetch branches. Please try again.');
      }
    };

    fetchAllBranches();
  }, []);

  const searchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/customers/checkCustomer?customerEmail=${customerEmail}`);
      if (response.data) {
        setCustomer(response.data);
        setError('');
      } else {
        setError('Customer not found');
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      setError('Failed to fetch customer details. Please try again.');
    }
  };

  const searchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/api/product/id?productShortId=${productShortId}`);
      if (response.data) {
        setProduct(response.data);
        setTotalPrice(response.data.sellingPrice * quantity);
        setError('');
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product details. Please try again.');
    }
  };

  const handleSubmitOrder = async () => {
    if (!customer || !product || !branchShortId) {
      setError('Please ensure customer, product, and branch details are filled.');
      return;
    }

    const orderData = {
      customerShortId: customer.customerShortId,
      branchShortId,
      productShortId: product.productShortId,
      quantity,
      totalPrice,
      transactionStatus,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:5004/api/orders', orderData);
      await axios.put(`http://localhost:5003/api/product/${product.productShortId}`, {
        quantity,
      });
      
      navigate('/invoice', {
        state: {
          orderData: {
            customer,
            product,
            quantity,
            totalPrice,
            transactionStatus,
            orderDate: orderData.orderDate
          }
        }
      });
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Create New Order</h1>
          </div>

          {/* Form Container */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Customer Search Section - Updated */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter customer email"
                />
                <button
                  onClick={searchCustomer}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 whitespace-nowrap"
                >
                  Search Customer
                </button>
                <button
                  onClick={() => navigate('/retail/customerForm')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 whitespace-nowrap"
                >
                  Register Customer
                </button>
              </div>
            </div>

            {/* Customer Details */}
            {customer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    value={customer.customerShortId}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customer.customerName}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    value={customer.customerEmail}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Phone
                  </label>
                  <input
                    type="text"
                    value={customer.customerPhone}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Date
                </label>
                <input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <select
                  value={branchShortId}
                  onChange={(e) => setBranchShortId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a branch</option>
                  {allBranches.map((branch) => (
                    <option key={branch.branchShortId} value={branch.branchShortId}>
                      {branch.branchName} (ID: {branch.branchShortId})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={productShortId}
                    onChange={(e) => setProductShortId(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter product ID"
                  />
                  <button
                    onClick={searchProduct}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            {product && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={product.productName}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    value={product.sellingPrice}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const qty = Math.max(1, parseInt(e.target.value, 10));
                      setQuantity(qty);
                      setTotalPrice(qty * product.sellingPrice);
                    }}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Price
                  </label>
                  <input
                    type="number"
                    value={totalPrice}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Transaction Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Status
                </label>
                <select
                  value={transactionStatus}
                  onChange={(e) => setTransactionStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOrder}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
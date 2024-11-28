import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/crm/DashboardLayout';

const ProductCreationForm: React.FC = () => {
  // State for form inputs
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [productQuantity, setProductQuantity] = useState<number | ''>(0);
  const [threshold, setThreshold] = useState<number | ''>(10);
  const [restockQuantity, setRestockQuantity] = useState<number | ''>(20);
  const [needsRestock, setNeedsRestock] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [actualPrice, setActualPrice] = useState<number | ''>(0);
  const [sellingPrice, setSellingPrice] = useState<number | ''>(0);
  const [profit, setProfit] = useState<number | ''>(0);
  const [branchShortId, setBranchShortId] = useState<string[]>([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calculateProfit = (actual: number | '', selling: number | '') => {
    if (typeof actual === 'number' && typeof selling === 'number') {
      return selling - actual;
    }
    return 0;
  };

  const handleActualPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setActualPrice(value);
    setProfit(calculateProfit(value, sellingPrice));
  };

  const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSellingPrice(value);
    setProfit(calculateProfit(actualPrice, value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create the product object
    const productData = {
      productName,
      brandName,
      productQuantity,
      threshold,
      restockQuantity,
      needsRestock,
      description,
      category,
      actualPrice,
      sellingPrice,
      profit,
      branchShortId
    };

    // Validation
    if (!productName || !brandName || !description || !category) {
      setError('Please fill in all required fields.');
      return;
    }

    const quantityIsValid = typeof productQuantity === 'number' && productQuantity >= 0;
    const thresholdIsValid = typeof threshold === 'number' && threshold >= 10;
    const restockQuantityIsValid = typeof restockQuantity === 'number' && restockQuantity >= 20;
    const actualPriceIsValid = typeof actualPrice === 'number' && actualPrice > 0;
    const sellingPriceIsValid = typeof sellingPrice === 'number' && sellingPrice > 0;

    if (!quantityIsValid || !thresholdIsValid || !restockQuantityIsValid || !actualPriceIsValid || !sellingPriceIsValid) {
      setError('Please ensure all numeric fields are valid.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5003/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // Reset form after successful submission
      setProductName('');
      setBrandName('');
      setProductQuantity(0);
      setThreshold(10);
      setRestockQuantity(20);
      setNeedsRestock(false);
      setDescription('');
      setCategory('');
      setActualPrice(0);
      setSellingPrice(0);
      setProfit(0);
      setBranchShortId([]);
      setError('');
      alert('Product created successfully!');
    } catch (err:any) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add a Product</h1>
          </div>

          {/* Form Container */}
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Product Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Quantity</label>
                <input
                  type="number"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Threshold */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Threshold</label>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Restock Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restock Quantity</label>
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Needs Restock Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={needsRestock}
                  onChange={() => setNeedsRestock(!needsRestock)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm font-medium text-gray-700">Needs Restock</label>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Actual Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Actual Price</label>
                <input
                  type="number"
                  value={actualPrice}
                  onChange={handleActualPriceChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price</label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={handleSellingPriceChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Profit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profit</label>
                <input
                  type="number"
                  value={profit}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Branch Short ID */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Branch Short ID (comma-separated)</label>
                <input
                  type="text"
                  value={branchShortId.join(',')}
                  onChange={(e) => setBranchShortId(e.target.value.split(','))}
                  required
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
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreationForm;
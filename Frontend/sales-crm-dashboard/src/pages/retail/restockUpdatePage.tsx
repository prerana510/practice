import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from "../../data/mock-db.json";

interface Product {
    productShortId: string;
    productName: string;
    brandName: string;
    category: string;
    productQuantity: number;
    threshold: number;
    restockQuantity: number;
}

const RestockUpdatePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(10);
    const [restockQuantities, setRestockQuantities] = useState<{ [key: string]: number }>({});
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setProducts(productsData.product);
    }, []);

    // Clear alert after 3 seconds
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    // Search and filter products
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product => 
        product.productShortId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Update restock quantity
    const handleRestockQuantityChange = (productId: string, quantity: number) => {
        setRestockQuantities(prev => ({
            ...prev,
            [productId]: quantity
        }));
    };

    // Submit restock for a specific product
    const handleIndividualRestock = (product: Product) => {
        try {
            const restockQty = restockQuantities[product.productShortId] || product.restockQuantity;
            
            // Update the specific product's quantity
            const updatedProducts = products.map(p => 
                p.productShortId === product.productShortId 
                    ? {
                        ...p, 
                        productQuantity: p.productQuantity + restockQty
                    } 
                    : p
            );

            setProducts(updatedProducts);
            setAlert({
                message: `Restocked ${product.productName} with ${restockQty} units.`,
                type: 'success'
            });

            // Clear the restock quantity for this specific product
            setRestockQuantities(prev => {
                const updated = {...prev};
                delete updated[product.productShortId];
                return updated;
            });
        } catch (error) {
            setAlert({
                message: `Failed to restock ${product.productName}.`,
                type: 'error'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header with Restock Quantity Overview */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">Restock Quantity</h1>
                    </div>

                    {/* Alert Component */}
                    {alert && (
                        <div className="mx-6 mt-4 mb-2">
                            <div className={`p-4 rounded-lg shadow-lg transition-all duration-300 
                                ${alert.type === 'success' 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-red-500 text-white'}`}>
                                {alert.message}
                            </div>
                        </div>
                    )}

                    {/* Search and Back to Products Controls */}
                    <div className="p-6 pb-0 flex justify-between items-center">
                        <div className="relative flex-grow mr-4">
                            <input
                                type="text"
                                placeholder="Search products by ID, name, brand, or category..."
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
                        
                        <button 
                            onClick={() => navigate('/retail/product')}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 flex items-center space-x-2"
                        >
                            <span>Back to Products</span>
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="p-6">
                        {filteredProducts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Quantity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restock Quantity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentProducts.map((product) => (
                                            <tr key={product.productShortId}>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.productShortId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.brandName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.productQuantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.threshold}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input 
                                                        type="number" 
                                                        value={restockQuantities[product.productShortId] || product.restockQuantity} 
                                                        onChange={(e) => handleRestockQuantityChange(
                                                            product.productShortId, 
                                                            Number(e.target.value)
                                                        )}
                                                        className="w-20 px-2 py-1 border rounded"
                                                        min="0"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleIndividualRestock(product)}
                                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                                                    >
                                                        Restock
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination Controls */}
                                <div className="mt-6 flex justify-center gap-4 items-center">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        Previous
                                    </button>
                                    <span className="flex items-center text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                No products found matching your search.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestockUpdatePage;
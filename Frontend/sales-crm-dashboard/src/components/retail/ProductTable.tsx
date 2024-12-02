import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from "../../data/mock-db.json";

interface Product {
    productShortId: string;
    productName: string;
    brandName: string;
    productQuantity: number;
    threshold: number;
    restockQuantity: number;
    needsRestock: boolean;
    description: string;
    category: string;
    actualPrice: number;
    sellingPrice: number;
    profit: number;
    branchShortId: string[];
}

const ProductTable: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setProducts(productsData.product);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Pagination calculations
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = products.filter(product =>
        product.productShortId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    if (loading) {
        return <p className="text-center text-lg font-semibold">Loading products...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center font-semibold">Error fetching products: {error}</p>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Search products by ID, name, brand, or category..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                        focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate('/retail/productForm')}
                        className="px-4 py-2 bg-white border border-indigo-600 rounded-lg
                        hover:bg-gray-50 transition-all duration-300 shadow-md
                        flex items-center gap-2 whitespace-nowrap"
                    >
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text">
                            Add Product
                        </span>
                    </button>
                    <button
                        onClick={() => navigate('/retail/restock')}
                        className="px-4 py-2 bg-white border border-indigo-600 rounded-lg
                        hover:bg-gray-50 transition-all duration-300 shadow-md
                        flex items-center gap-2 whitespace-nowrap"
                    >
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text">
                            Restock Products
                        </span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-indigo-600 text-lg">Loading products...</div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                    {error}
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Product</th>
                                <th className="px-6 py-3 text-left">Brand</th>
                                <th className="px-6 py-3 text-left">Quantity</th>
                                <th className="px-6 py-3 text-left">Category</th>
                                <th className="px-6 py-3 text-left">Profit</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {currentProducts.map((product) => (
                                <tr key={product.productShortId} 
                                    className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">{product.productShortId}</td>
                                    <td className="px-6 py-4 font-medium">{product.productName}</td>
                                    <td className="px-6 py-4">{product.brandName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            product.productQuantity <= product.threshold
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {product.productQuantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4 text-green-600">
                                        ${product.profit.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => navigate(`/retail/products/product/${product.productShortId}`)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                                            hover:bg-indigo-700 transition-colors duration-300"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="bg-gray-50 px-6 py-4 flex justify-center items-center gap-2">
                        <button
                            className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600
                            hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPage === index + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-indigo-600 hover:bg-indigo-50'
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600
                            hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No products found</p>
                </div>
            )}
        </div>
    );
};

export default ProductTable;
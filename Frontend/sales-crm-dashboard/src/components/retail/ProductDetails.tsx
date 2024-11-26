import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/crm/DashboardLayout';

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

const ProductDetails: React.FC = () => {
    const { productShortId } = useParams<{ productShortId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productsData = await import('../../data/mock-db.json');

            // Access the products array
            const products = productsData.product;

            // Find the product matching the `productShortId`
            const product = products.find((p) => p.productShortId === productShortId);
            if (!product) {
                throw new Error('Product not found');
            }
            setProduct(product);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productShortId]);

    if (loading) return (
        <DashboardLayout>
            <div className="flex justify-center items-center h-screen">
                <div className="text-indigo-600 text-lg">Loading product details...</div>
            </div>
        </DashboardLayout>
    );

    if (error || !product) return (
        <DashboardLayout>
            <div className={`p-4 ${error ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-700'} text-center rounded-lg mx-4`}>
                {error || 'Product not found.'}
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg
                        hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md
                        flex items-center gap-2"
                    >
                        ← Back to Product List
                    </button>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                            <h2 className="text-2xl font-bold text-white">Product Details</h2>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Basic Info Row */}
                                <DetailItem label="Product ID" value={product.productShortId} />
                                <DetailItem label="Product Name" value={product.productName} />
                                <DetailItem label="Brand Name" value={product.brandName} />
                                <DetailItem label="Category" value={product.category} />

                                {/* Inventory Row */}
                                <DetailItem 
                                    label="Quantity" 
                                    value={product.productQuantity}
                                    className={`rounded-full px-3 py-1 text-center ${
                                        product.productQuantity <= product.threshold
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}
                                />
                                <DetailItem label="Threshold" value={product.threshold} />
                                <DetailItem label="Restock Quantity" value={product.restockQuantity} />
                                <DetailItem 
                                    label="Needs Restock" 
                                    value={product.needsRestock ? 'Yes' : 'No'}
                                    className={`rounded-full px-3 py-1 text-center ${
                                        product.needsRestock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                    }`}
                                />

                                {/* Pricing Row */}
                                <DetailItem 
                                    label="Actual Price" 
                                    value={`$${product.actualPrice.toFixed(2)}`}
                                    className="text-gray-600"
                                />
                                <DetailItem 
                                    label="Selling Price" 
                                    value={`$${product.sellingPrice.toFixed(2)}`}
                                    className="text-gray-600"
                                />
                                <DetailItem 
                                    label="Profit" 
                                    value={`$${product.profit.toFixed(2)}`}
                                    className="text-green-600 font-semibold"
                                />

                                {/* Description - Full Width */}
                                <div className="col-span-full">
                                    <DetailItem label="Description" value={product.description} />
                                </div>

                                {/* Branch IDs - Full Width */}
                                <div className="col-span-full">
                                    <DetailItem 
                                        label="Branch IDs" 
                                        value={product.branchShortId.map(id => (
                                            <span key={id} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                                                {id}
                                            </span>
                                        ))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

interface DetailItemProps {
    label: string;
    value: React.ReactNode;
    className?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, className }) => (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
        <div className="text-sm text-gray-600 mb-1">{label}</div>
        <div className={className}>{value}</div>
    </div>
);

export default ProductDetails;
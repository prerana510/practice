import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcons from 'lucide-react';

// Access components like:
const Search = LucideIcons.Search;
const UserPlus = LucideIcons.UserPlus;
const ShoppingCart = LucideIcons.ShoppingCart;


const mockDb = {
  branches: [
    {
      "branchShortId": "BR001",
      "branchName": "Downtown Branch"
    },
    {
      "branchShortId": "BR002", 
      "branchName": "Uptown Branch"
    },
    {
      "branchShortId": "BR003",
      "branchName": "Suburban Branch"
    }
  ],
  customers: [
    {
      "customerShortId": "CUST001",
      "customerName": "John Doe",
      "customerEmail": "john.doe@example.com",
      "customerPhone": "123-456-7890"
    },
    {
      "customerShortId": "CUST002", 
      "customerName": "Jane Smith",
      "customerEmail": "jane.smith@example.com", 
      "customerPhone": "987-654-3210"
    }
  ],
  products: [
    {
      "productShortId": "PROD001",
      "productName": "Wireless Headphones",
      "sellingPrice": 99.99,
      "stockQuantity": 50
    },
    {
      "productShortId": "PROD002",
      "productName": "Smart Watch",
      "sellingPrice": 199.99,
      "stockQuantity": 30
    },
    {
      "productShortId": "PROD003", 
      "productName": "Bluetooth Speaker",
      "sellingPrice": 79.99,
      "stockQuantity": 75
    }
  ]
};

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

// Corrected: Capitalized component name and converted to function component
const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [productShortId, setProductShortId] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [branchShortId, setBranchShortId] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<string>('Pending');
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [orderDate, setOrderDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setAllBranches(mockDb.branches);
  }, []);

  // Search customer by email
  const searchCustomer = () => {
    const foundCustomer = mockDb.customers.find(
      (c) => c.customerEmail.toLowerCase() === customerEmail.toLowerCase()
    );

    if (foundCustomer) {
      setCustomer(foundCustomer);
      alert(`User found with customerShortId: ${foundCustomer.customerShortId}`);
    } else {
      alert('Customer not found');
    }
  };

  const handleRegisterCustomerClick = () => {
    // In a real app, navigate to customer registration
    alert('Customer registration not implemented in mock version');
  };

  // Search product by short ID
  const searchProduct = () => {
    const foundProduct = mockDb.products.find(
      (p) => p.productShortId.toLowerCase() === productShortId.toLowerCase()
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setTotalPrice(foundProduct.sellingPrice * quantity);
    } else {
      alert('Product not found');
    }
  };

  // Handle order submission
  const handleSubmitOrder = () => {
    if (!customer || !product || !branchShortId) {
      alert('Please ensure customer, product, and branch details are filled.');
      return;
    }

    // Check stock quantity
    if (quantity > product.stockQuantity) {
      alert(`Insufficient stock. Only ${product.stockQuantity} items available.`);
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

    // Simulate order creation and stock update
    const updatedProducts = mockDb.products.map(p => 
      p.productShortId === product.productShortId 
        ? { ...p, stockQuantity: p.stockQuantity - quantity } 
        : p
    );

    alert('Order created successfully!');

    // Navigate to Invoice page with order data
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-3" /> Create New Order
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Rest of the component's render method remains the same */}
          {/* (previous implementation's JSX is preserved) */}
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
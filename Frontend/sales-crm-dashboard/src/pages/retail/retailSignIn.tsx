import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Server } from 'lucide-react';

const RetailSignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://5000-idx-practice-1732610575989.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/api/users/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        console.log('Login response data:', data);
        
        sessionStorage.setItem('token', data.token); 
        sessionStorage.setItem('branchShortId', data.branchShortId);
        sessionStorage.setItem('role', data.role);
        
        navigate('/retail/main'); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col antialiased">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-4">
            <Server className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Sales ERP</h1>
          </Link>
          <nav className="space-x-4">
            <Link to="#features" className="hover:text-indigo-200 transition-colors">Features</Link>
            <Link to="#solutions" className="hover:text-indigo-200 transition-colors">Solutions</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 border border-gray-100">
          {/* Left Side - Elegant Gradient Background */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 opacity-10 rounded-full -ml-36 -mb-36"></div>
            
            <div className="z-10">
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Welcome Back</h2>
              <p className="text-xl text-indigo-100 leading-relaxed mb-8">
                Sign in to access your retail management dashboard. 
                Track sales and gain insights into your business performance.
              </p>
            </div>
          </div>
          
          {/* Right Side - Login Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Sign In</h2>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out hover:border-indigo-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out hover:border-indigo-400"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 font-semibold tracking-wider"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
              
              {error && (
                <p className="text-red-500 text-sm text-center mt-4">{error}</p>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account? {' '}
                  <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailSignIn;
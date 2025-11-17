import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getSubtotal, getDiscount, getShipping, getTotal } = useCart();
  const { darkMode } = useTheme();
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const quantity = Math.max(0, newQuantity);
    updateQuantity(productId, quantity);
  };

  const handleApplyCoupon = () => {
    // Placeholder for coupon functionality
    alert('Coupon functionality coming soon!');
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <svg 
              className={`w-32 h-32 mb-8 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
              Your Cart is Empty
            </h2>
            <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Add some products to get started!
            </p>
            <Link 
              to="/products"
              className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Table */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                        S.No.
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                        Product Image
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                        Product Name
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                        Unit Price
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                        Quantity
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                        Total
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${darkMode ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
                    {items.map((item, index) => {
                      const unitPrice = item.discount 
                        ? item.price * (1 - item.discount) 
                        : item.price;
                      const itemTotal = unitPrice * item.quantity;

                      return (
                        <tr 
                          key={item.productId}
                          className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                        >
                          <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img 
                              src={`/${item.imgName}`} 
                              alt={item.name}
                              className="w-16 h-16 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-product.png';
                              }}
                            />
                          </td>
                          <td className={`px-6 py-4 ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                            {item.name}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                            ${unitPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 0)}
                              className={`w-20 px-3 py-2 ${darkMode ? 'bg-gray-700 text-light border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            />
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                            ${itemTotal.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} transition-colors`}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth="2" 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                {items.map((item, index) => {
                  const unitPrice = item.discount 
                    ? item.price * (1 - item.discount) 
                    : item.price;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div 
                      key={item.productId}
                      className={`p-4 ${index > 0 ? (darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200') : ''}`}
                    >
                      <div className="flex gap-4">
                        <img 
                          src={`/${item.imgName}`} 
                          alt={item.name}
                          className="w-20 h-20 object-contain flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.png';
                          }}
                        />
                        <div className="flex-grow">
                          <h3 className={`font-semibold mb-2 ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            ${unitPrice.toFixed(2)} per unit
                          </p>
                          <div className="flex items-center gap-4 mb-2">
                            <input
                              type="number"
                              min="0"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 0)}
                              className={`w-20 px-3 py-2 ${darkMode ? 'bg-gray-700 text-light border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            />
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} transition-colors`}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth="2" 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <p className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                            Total: ${itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coupon and Update Cart Section */}
            <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className={`w-full px-4 py-2 ${darkMode ? 'bg-gray-700 text-light border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg transition-colors font-medium whitespace-nowrap"
                >
                  Apply Coupon
                </button>
                <button
                  className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-light' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-6 py-2 rounded-lg transition-colors font-medium whitespace-nowrap`}
                >
                  Update Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-24`}>
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subtotal:</span>
                  <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                    ${getSubtotal().toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-green-500">
                  <span>Discount (5%):</span>
                  <span className="font-semibold">-${getDiscount().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shipping:</span>
                  <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                    ${getShipping().toFixed(2)}
                  </span>
                </div>
                
                <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                      Grand Total:
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

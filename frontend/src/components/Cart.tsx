import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, orderSummary, removeItem, updateQuantity, applyCoupon, removeCoupon, appliedCouponCode } = useCart();
  const { darkMode } = useTheme();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const success = applyCoupon(couponCode);
    if (success) {
      setCouponSuccess('Coupon applied successfully!');
      setCouponCode('');
      setTimeout(() => setCouponSuccess(''), 3000);
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponSuccess('Coupon removed');
    setTimeout(() => setCouponSuccess(''), 3000);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <svg
              className={`w-24 h-24 ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-6`}
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
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              Your cart is empty
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              Add some products to get started
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-8`}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">S. No.</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Remove</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {items.map((item, index) => (
                      <tr key={item.id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                        <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={`/${item.image}`}
                              alt={item.name}
                              className={`w-20 h-20 object-contain rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2`}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 w-fit`}>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-[#22c55e] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val)) handleQuantityChange(item.id, val);
                              }}
                              className={`w-16 text-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} border-0 focus:outline-none`}
                              min="1"
                              max="99"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-[#22c55e] transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap font-semibold">
                          ${item.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-[#22c55e] hover:text-[#16a34a] transition-colors"
                            aria-label="Remove item"
                          >
                            <svg
                              className="w-5 h-5"
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
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-700">
                {items.map((item, index) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-sm font-medium text-gray-400 w-8">
                        {index + 1}.
                      </div>
                      <img
                        src={`/${item.image}`}
                        alt={item.name}
                        className={`w-20 h-20 object-contain rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2`}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">
                          Unit Price: ${item.unitPrice.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1`}>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-[#22c55e]"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-[#22c55e]"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-[#22c55e] hover:text-[#16a34a]"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-lg font-semibold mt-2">
                          Total: ${item.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className={`w-full px-4 py-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} border rounded-lg focus:outline-none focus:border-[#22c55e]`}
                    disabled={!!appliedCouponCode}
                  />
                  {couponError && (
                    <p className="text-red-500 text-sm mt-2">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-[#22c55e] text-sm mt-2">{couponSuccess}</p>
                  )}
                </div>
                {appliedCouponCode ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    Remove Coupon
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    Apply Coupon
                  </button>
                )}
              </div>
              {appliedCouponCode && (
                <p className="text-sm text-gray-400 mt-2">
                  Applied: <span className="text-[#22c55e] font-medium">{appliedCouponCode}</span>
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-24`}>
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                
                {orderSummary.discountPercent > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discount ({orderSummary.discountPercent}%)</span>
                    <span className="font-medium text-red-500">-${orderSummary.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-medium">${orderSummary.shipping.toFixed(2)}</span>
                </div>
                
                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Grand Total</span>
                    <span className="text-2xl font-bold text-[#22c55e]">
                      ${orderSummary.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 rounded-lg font-medium mt-6 transition-colors"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

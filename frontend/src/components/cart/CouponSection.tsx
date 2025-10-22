import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function CouponSection() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const { darkMode } = useTheme();
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      setSuccess('');
      return;
    }

    const isValid = applyCoupon(couponCode);
    if (isValid) {
      setSuccess('Coupon applied successfully!');
      setError('');
      setCouponCode('');
    } else {
      setError('Invalid coupon code');
      setSuccess('');
    }

    // Clear messages after 3 seconds
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setSuccess('Coupon removed');
    setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>
        Have a Coupon?
      </h3>

      {coupon ? (
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-primary/10 border border-primary/30' : 'bg-green-50 border border-green-200'}`}>
            <div>
              <span className="text-primary font-semibold">{coupon.code}</span>
              <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ({coupon.discountPercent}% off)
              </span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-primary hover:text-accent transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
              placeholder="Coupon Code"
              className={`flex-1 px-4 py-2 ${darkMode ? 'bg-gray-700 text-light border-gray-600' : 'bg-white text-gray-900 border-gray-300'} rounded-lg border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors`}
            />
            <button
              onClick={handleApplyCoupon}
              className="px-6 py-2 bg-primary hover:bg-accent text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Apply Coupon
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {success && (
            <p className="text-primary text-sm">{success}</p>
          )}

          {/* Available coupons hint */}
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            Try: SAVE5, SAVE10, SAVE15, or WELCOME
          </div>
        </div>
      )}
    </div>
  );
}

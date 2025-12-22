import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const SHIPPING_COST = 10.0;

export default function OrderSummary() {
  const { getSubtotal, coupon, items } = useCart();
  const { darkMode } = useTheme();

  const subtotal = getSubtotal();
  const discountAmount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const grandTotal = subtotal - discountAmount + shipping;

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-24`}>
      <h2 className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6`}>
        Order Summary
      </h2>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subtotal</span>
          <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        {coupon && (
          <div className="flex justify-between items-center text-primary">
            <span>Discount ({coupon.discountPercent}%)</span>
            <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shipping</span>
          <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
            ${shipping.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} my-4`} />

        {/* Grand Total */}
        <div className="flex justify-between items-center text-lg">
          <span className={`font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>Grand Total</span>
          <span className={`font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full mt-6 bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors">
        Proceed To Checkout
      </button>
    </div>
  );
}

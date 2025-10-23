import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function CartSummary() {
  const { getTotalItems, getTotalPrice } = useCart();
  const { darkMode } = useTheme();

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1; // 10% tax for example
  const total = subtotal + tax;

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md transition-colors duration-300 sticky top-24`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-900'} mb-6`}>
        Order Summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Items ({totalItems})
          </span>
          <span className={darkMode ? 'text-light' : 'text-gray-900'}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Tax (10%)
          </span>
          <span className={darkMode ? 'text-light' : 'text-gray-900'}>
            ${tax.toFixed(2)}
          </span>
        </div>

        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-3 mt-3`}>
          <div className="flex justify-between items-center">
            <span className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
              Total
            </span>
            <span className="text-2xl font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        className="w-full mt-6 bg-primary hover:bg-accent text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>

      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center mt-4`}>
        Checkout functionality coming soon
      </p>
    </div>
  );
}

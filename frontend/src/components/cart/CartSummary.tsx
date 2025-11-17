import { useTheme } from '../../context/ThemeContext';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export default function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
  const { darkMode } = useTheme();
  const taxRate = 0.08; // 8% tax
  const tax = totalPrice * taxRate;
  const finalTotal = totalPrice + tax;

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-300`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6`}>
        Order Summary
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Items ({totalItems})
          </span>
          <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tax (8%)
          </span>
          <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>
            ${tax.toFixed(2)}
          </span>
        </div>
        
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
          <div className="flex justify-between items-center">
            <span className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
              Total
            </span>
            <span className="text-2xl font-bold text-primary">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <button
        className="w-full mt-6 bg-primary hover:bg-accent text-white py-3 rounded-lg text-lg font-medium transition-colors"
        onClick={() => alert('Checkout functionality coming soon!')}
      >
        Proceed to Checkout
      </button>
      
      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center mt-4`}>
        Secure checkout powered by OctoCAT Supply
      </p>
    </div>
  );
}

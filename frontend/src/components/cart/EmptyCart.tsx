import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function EmptyCart() {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg 
        className={`w-32 h-32 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-8`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.5" 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>
        Your cart is empty
      </h2>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 text-center max-w-md`}>
        Looks like you haven't added any items to your cart yet. Browse our products and start shopping!
      </p>
      <Link
        to="/products"
        className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

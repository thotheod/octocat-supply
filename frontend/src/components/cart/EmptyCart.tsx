import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function EmptyCart() {
  const { darkMode } = useTheme();

  return (
    <div className="text-center py-16">
      <svg
        className={`mx-auto h-24 w-24 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 className={`mt-4 text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
        Your cart is empty
      </h3>
      <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Start adding some products to your cart!
      </p>
      <div className="mt-6">
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-accent transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

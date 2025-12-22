import { useCart, CartItem as CartItemType } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

interface CartItemProps {
  item: CartItemType;
  serialNumber: number;
}

export default function CartItem({ item, serialNumber }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { darkMode } = useTheme();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const total = item.unitPrice * item.quantity;

  return (
    <tr className={`${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}>
      {/* Serial Number */}
      <td className={`px-4 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-light' : 'text-gray-900'}`}>
        {serialNumber}
      </td>

      {/* Product Image */}
      <td className="px-4 py-4 whitespace-nowrap">
        <img
          src={`/${item.image}`}
          alt={item.name}
          className={`h-16 w-16 object-contain rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        />
      </td>

      {/* Product Name */}
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-light' : 'text-gray-900'}`}>
        {item.name}
      </td>

      {/* Unit Price */}
      <td className={`px-4 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-light' : 'text-gray-900'}`}>
        ${item.unitPrice.toFixed(2)}
      </td>

      {/* Quantity */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1 w-fit`}>
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors rounded`}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            min="0"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
            className={`w-16 text-center ${darkMode ? 'bg-gray-800 text-light' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded px-2 py-1 text-sm focus:outline-none focus:border-primary`}
          />
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors rounded`}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </td>

      {/* Total */}
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
        ${total.toFixed(2)}
      </td>

      {/* Remove */}
      <td className="px-4 py-4 whitespace-nowrap">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-primary hover:text-accent transition-colors"
          aria-label="Remove item"
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
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

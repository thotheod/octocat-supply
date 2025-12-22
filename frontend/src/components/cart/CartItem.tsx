import { useTheme } from '../../context/ThemeContext';
import { CartItem as CartItemType } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { darkMode } = useTheme();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-4 transition-colors duration-300`}>
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className={`w-24 h-24 flex-shrink-0 ${darkMode ? 'bg-gradient-to-t from-gray-700 to-gray-800' : 'bg-gradient-to-t from-gray-100 to-white'} rounded-lg overflow-hidden`}>
          <img 
            src={`/${item.image}`} 
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-grow">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-1`}>
            {item.name}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            ${item.price.toFixed(2)} each
          </p>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg transition-colors duration-300`}>
              <button 
                onClick={() => handleQuantityChange(-1)}
                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors`}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <span aria-hidden="true">-</span>
              </button>
              <span 
                className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center font-medium`}
                aria-label={`Quantity: ${item.quantity}`}
              >
                {item.quantity}
              </span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors`}
                aria-label={`Increase quantity of ${item.name}`}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => onRemove(item.productId)}
              className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'} transition-colors`}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        </div>
        
        {/* Subtotal */}
        <div className={`text-right ${darkMode ? 'text-light' : 'text-gray-800'}`}>
          <p className="text-lg font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

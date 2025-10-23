import { useCart, CartItem as CartItemType } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { darkMode } = useTheme();

  const itemPrice = item.discount 
    ? item.price * (1 - item.discount) 
    : item.price;
  
  const subtotal = itemPrice * item.quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md transition-colors duration-300`}>
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className={`flex-shrink-0 w-24 h-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
          {item.imgName ? (
            <img
              src={`/${item.imgName}`}
              alt={item.name}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className={`h-12 w-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
            {item.name}
          </h3>
          {item.description && (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              {item.description}
            </p>
          )}
          <div className="mt-2">
            {item.discount ? (
              <div>
                <span className="text-gray-500 line-through text-sm mr-2">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-primary font-semibold">
                  ${itemPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-xs text-primary">
                  ({Math.round(item.discount * 100)}% off)
                </span>
              </div>
            ) : (
              <span className="text-primary font-semibold">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end gap-3">
          <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1`}>
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center font-semibold`}>
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Subtotal and Remove Button */}
          <div className="text-right">
            <div className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
              ${subtotal.toFixed(2)}
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors"
              aria-label="Remove item from cart"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

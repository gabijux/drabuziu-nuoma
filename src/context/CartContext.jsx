import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

// A cart line is unique by product + size + rental period
const lineKey = (item) => `${item.productId}-${item.size}-${item.days}`;

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.item);
      if (state.some((line) => line.key === key)) return state;
      return [...state, { ...action.item, key }];
    }
    case 'remove':
      return state.filter((line) => line.key !== action.key);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const value = {
    items,
    addItem: (item) => dispatch({ type: 'add', item }),
    removeItem: (key) => dispatch({ type: 'remove', key }),
    clearCart: () => dispatch({ type: 'clear' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

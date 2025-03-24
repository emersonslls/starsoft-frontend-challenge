import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantidade += 1;  // Incrementa a quantidade se o item já estiver no carrinho
      } else {
        state.items.push(action.payload);  // Adiciona novo item
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);  // Remove item pelo ID
    },
    clearCart(state) {
      state.items = [];  // Limpa o carrinho
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

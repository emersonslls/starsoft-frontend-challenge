// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';  // Seu reducer do carrinho (exemplo)

// Criação da store
export const store = configureStore({
  reducer: {
    cart: cartReducer,  // Reducer do cart
  },
});

// Tipagem da store
export type RootState = ReturnType<typeof store.getState>;  // Tipo do estado
export type AppDispatch = typeof store.dispatch;  // Tipo do dispatch

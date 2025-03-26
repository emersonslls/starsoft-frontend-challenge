// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';  // Certifique-se de que o caminho esteja correto

const store = configureStore({
  reducer: {
    cart: cartReducer,  // Aqui você está configurando o reducer de carrinho
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Aqui, pegamos o tipo do estado global
export type AppDispatch = typeof store.dispatch; // Tipo do dispatch

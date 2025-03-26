// hooks/useCart.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';  // Certifique-se de que o caminho esteja correto
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice';

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addToCartHandler = (item: CartItem) => {
    dispatch(addToCart(item));  // Despachando a ação de adicionar item ao carrinho
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));  // Despachando a ação de remover item do carrinho
  };

  const clearCartHandler = () => {
    dispatch(clearCart());  // Despachando a ação de limpar o carrinho
  };

  return {
    cartItems,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    clearCart: clearCartHandler,
  };
};

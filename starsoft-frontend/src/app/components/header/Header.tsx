import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store'; // Importe o estado global do Redux
import { clearCart } from '@/app/redux/cartSlice'; // Importe a ação clearCart
import Image from 'next/image';
import { useState, useEffect } from 'react';
import '../../styles/components/_header.scss';
import Cart from '@/app/pages/cart';

import { motion, AnimatePresence } from 'framer-motion';


export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Acessa o número total de itens no carrinho via Redux
  const cartItemCount = useSelector((state: RootState) => state.cart.items.reduce((total, item) => total + item.quantidade, 0));

  const dispatch = useDispatch();

  // Função para alternar a visibilidade do carrinho
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Função para fechar o carrinho e restaurar o scroll
  const closeCart = () => {
    setIsCartOpen(false);
    document.body.style.overflow = 'auto'; // Restaura o scroll quando o carrinho é fechado
  };

  // Efeito colateral para manipular o scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'; // Desativa o scroll quando o carrinho está aberto
    }

    return () => {
      document.body.style.overflow = 'auto'; // Restaura o scroll quando o carrinho é fechado
    };
  }, [isCartOpen]);

  // Função para finalizar a compra e resetar o contador
  const finalizePurchase = () => {
    dispatch(clearCart()); // Limpa o carrinho
    closeCart(); // Fecha o carrinho
  };

  return (
    <header className="header">
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        width={54}
        height={33}
        className="Logo"
      />
      <div className="container-bag" onClick={toggleCart} aria-label="Abrir Carrinho">
        <div className="container-icon">
          <Image
            src="/assets/Icons/Bag.svg"
            alt="Bag"
            width={30}
            height={30}
            className="BagIcon"
          />
        </div>
        <p>{cartItemCount}</p> {/* Exibe o contador de itens no carrinho */}
      </div>

      {/* Exibe o carrinho quando isCartOpen for true */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeCart}
            />
            <motion.div
              className="container-cart"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Cart closeCart={closeCart} finalizePurchase={finalizePurchase} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}

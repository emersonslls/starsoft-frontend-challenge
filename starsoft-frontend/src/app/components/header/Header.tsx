import Image from 'next/image';
import { useState, useEffect } from 'react';
import '../../styles/components/_header.scss';

import Cart from '@/app/pages/cart';

interface HeaderProps {
  addToCartCount: number;
}

export function Header({ addToCartCount }: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Função para alternar a visibilidade do carrinho
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Efeito colateral para manipular o scroll
  useEffect(() => {
    if (isCartOpen) {
      // Desativa o scroll quando o carrinho está aberto
      document.body.style.overflow = 'hidden';
    } else {
      // Restaura o scroll quando o carrinho está fechado
      document.body.style.overflow = 'auto';
    }

    // Limpeza do efeito para restaurar o estado original quando o componente for desmontado
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]); // Dependência de isCartOpen

  return (
    <header className="header">
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        width={54}
        height={33}
        className="Logo"
      />
      <div className="container-bag" onClick={toggleCart}>
        <div className="container-icon">
          <Image
            src="/assets/Icons/Bag.svg"
            alt="Bag"
            width={30}
            height={30}
            className="BagIcon"
          />
        </div>
        <p>{addToCartCount}</p>
      </div>

      {/* Exibe o carrinho quando isCartOpen for true */}
      {isCartOpen && <Cart />}
    </header>
  );
}

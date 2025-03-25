'use client';  // Diretiva para tornar o componente um "client component"
import { useState } from 'react';
import "./styles/pages/home.scss";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import NFTContainer from "./components/card/NFTContainer";
import Button from './components/button/Button';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);  // Estado do carrinho

  return (
    <div className="Container">
      {/* Passando cartCount para o Header para exibir a quantidade no carrinho */}
      <Header addToCartCount={cartCount} />

      {/* Passando setCartCount para atualizar o carrinho dentro do NFTContainer */}
      <NFTContainer setCartCount={setCartCount} />

      {/* Componente de botão */}
      <Button />

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

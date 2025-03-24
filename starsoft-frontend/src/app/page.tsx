'use client';  // Diretiva para tornar o componente um "client component"
import { useState } from 'react';
import "./styles/pages/home.scss";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import NFTContainer from "./components/card/NFTContainer";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="Container">
      <Header addToCartCount={cartCount} />
      <NFTContainer setCartCount={setCartCount} />
      <Footer />
    </div>
  );
}

'use client';
import { useState } from 'react';
import Head from 'next/head'; // 👈 importa o Head
import './styles/pages/home.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import NFTContainer from './components/card/NFTContainer';
import Button from './components/button/Button';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = (totalNFTs: number) => {
    if (visibleCount >= totalNFTs) {
      setVisibleCount(8);
    } else {
      setVisibleCount((prev) => prev + 8);
    }
  };

  return (
    <div className="Container">
      {/* SEO e Meta Tags */}
      <Head>
        <title>Crédito Liberado | Compre e colecione NFTs exclusivas</title>
        <meta
          name="description"
          content="Encontre, colecione e compre NFTs únicas com facilidade. Plataforma rápida, segura e intuitiva!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Crédito Liberado | NFTs" />
        <meta property="og:description" content="Colecione NFTs exclusivas em nossa plataforma." />
        <meta property="og:image" content="/thumb.png" />
        <meta property="og:type" content="website" />
      </Head>

      <Header />

      <main>
        <NFTContainer setCartCount={setCartCount} />
        <Button visibleCount={visibleCount} handleLoadMore={handleLoadMore} />
      </main>

      <Footer />
    </div>
  );
}

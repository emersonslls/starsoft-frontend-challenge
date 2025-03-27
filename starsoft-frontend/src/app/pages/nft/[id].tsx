// pages/nft/[id].tsx (Página de Detalhes da NFT)

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Para capturar o id via URL
import Head from 'next/head';
import './styles/pages/NFtDetails.scss';

const NftDetail = () => {
  const { query } = useRouter(); // Para acessar o parâmetro da URL
  const { id } = query; // Captura o id da NFT da URL
  const [nftData, setNftData] = useState<any | null>(null); // Estado para armazenar os dados da NFT
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNftDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products/${id}`);
        const data = await response.json();
        setNftData(data);
      } catch (error) {
        console.error('Erro ao carregar detalhes da NFT:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNftDetail();
  }, [id]);

  if (loading) {
    return <p>Carregando detalhes...</p>;
  }

  if (!nftData) {
    return <p>NFT não encontrada.</p>;
  }

  return (
    <div className="nft-detail-container">
      <Head>
        <title>{nftData.name} | Detalhes da NFT</title>
        <meta name="description" content={`Detalhes da NFT ${nftData.name}`} />
        <meta property="og:title" content={`Detalhes da NFT ${nftData.name}`} />
        <meta property="og:image" content={nftData.imageUrl} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="nft-detail">
        <img src={nftData.imageUrl} alt={nftData.name} />
        <h2>{nftData.name}</h2>
        <p>{nftData.description}</p>
        <p><strong>Preço:</strong> {nftData.price}</p>
        {/* Adicione mais detalhes conforme necessário */}
      </div>
    </div>
  );
};

export default NftDetail;

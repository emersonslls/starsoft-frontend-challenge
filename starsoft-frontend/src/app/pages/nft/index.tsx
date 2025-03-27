// src/app/pages/nft/index.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface Nft {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

// Função para buscar a lista de NFTs
const fetchNfts = async (): Promise<Nft[]> => {
  const response = await fetch('/api/nfts');
  if (!response.ok) {
    throw new Error('Erro ao buscar as NFTs');
  }
  return response.json();
};

const NftListPage = () => {
  const { data, error, isLoading } = useQuery<Nft[], Error>({
    queryKey: ['nfts'],
    queryFn: fetchNfts,
  });

  if (isLoading) return <div>Carregando NFTs...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h1>Lista de NFTs</h1>
      <div>
        {data?.map((nft) => (
          <div key={nft.id}>
            <Link href={`/nft/${nft.id}`}>
              <a>
                <h2>{nft.name}</h2>
                <img src={nft.imageUrl} alt={nft.name} width={100} />
                <p>Preço: ${nft.price}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftListPage;
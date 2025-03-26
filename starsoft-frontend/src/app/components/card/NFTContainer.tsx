import { useQuery } from '@tanstack/react-query';
import { fetchNFTs } from '../../service/api';
import CardNFT from './NFTCard';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import LoadingScreen from '../loading/Loading';

interface NFT {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image: string;
}


interface NFTContainerProps {
  setCartCount: Dispatch<SetStateAction<number>>;
}

export default function NFTContainer({ setCartCount }: NFTContainerProps) {
  const { data, isLoading, isError, error } = useQuery<NFT[]>({
    queryKey: ['nfts'],
    queryFn: fetchNFTs,
  });

  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayedLoading(false);
    }, 5000); // Simula o atraso de 5 segundos

    return () => clearTimeout(timer);
  }, []);

  if (isError) {
    console.error('Erro ao carregar as NFTs:', error);
    return (
      <div>
        Erro ao carregar as NFTs: {error instanceof Error ? error.message : 'Erro desconhecido'}
      </div>
    );
  }

  // Verificando os dados recebidos
  console.log('NFTs recebidas:', data);

  const nftsParaExibir = Array.isArray(data) && data.length ? data.slice(0, 8) : [];

  if (isDelayedLoading || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container-NFT">
      {nftsParaExibir.length === 0 ? (
        <div>Desculpe, nenhuma NFT disponível no momento. Tente novamente mais tarde.</div>
      ) : (
        nftsParaExibir.map((nft) => (
          <CardNFT
            key={nft.id}
            name={nft.name}
            description={nft.description}
            price={nft.price}
            image={nft.image || '/fallback-image.png'}
            setCartCount={setCartCount}
          />

        ))
      )}
    </div>
  );
}

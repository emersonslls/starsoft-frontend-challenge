import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchNFTs } from '../../service/api';
import CardNFT from './NFTCard';
import LoadingScreen from '../loading/Loading';
import Button from '../button/Button';

interface NFT {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface NFTContainerProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function NFTContainer({ setCartCount }: NFTContainerProps) {
  const { data, isLoading, isError, error } = useQuery<NFT[]>({
    queryKey: ['nfts'],
    queryFn: fetchNFTs,
  });

  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const [page, setPage] = useState(0);  // Controla a página das NFTs
  const itemsPerPage = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayedLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isDelayedLoading) return <LoadingScreen />;
  if (isError) return <div>Erro: {error instanceof Error ? error.message : 'Erro desconhecido'}</div>;
  if (!data) return null;

  const totalNFTs = data.length;
  const totalPages = Math.ceil(totalNFTs / itemsPerPage);  // Total de páginas
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const nftsParaExibir = data.slice(start, end);

  // Lógica para alternar entre as páginas
  const handleLoadMore = (totalNFTs: number) => {
    const isLastPage = page >= totalPages - 1;
    setPage(isLastPage ? 0 : page + 1); // Se for a última página, volta para a primeira, senão vai para a próxima
  };

  return (
    <>
      <div className="container-NFT">
        {nftsParaExibir.map((nft) => (
          <CardNFT
            key={nft.id}
            name={nft.name}
            description={nft.description}
            price={nft.price}
            image={nft.image || '/fallback-image.png'}
            setCartCount={setCartCount}
          />
        ))}
      </div>

      {/* Passa o número total de NFTs e a função para carregar mais */}
      <Button visibleCount={nftsParaExibir.length} handleLoadMore={handleLoadMore} />
    </>
  );
}
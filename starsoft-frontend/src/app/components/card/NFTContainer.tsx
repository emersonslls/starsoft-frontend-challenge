'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNFTs } from '../../service/api';
import CardNFT from './NFTCard';
import { Dispatch, SetStateAction } from 'react';

// Defina o tipo para os NFTs que será utilizado na função map
interface NFT {
  id: number;
  nome: string;
  descricao: string;
  preco: number | string;
  imagem: string;
  icone: string;
}

interface NFTContainerProps {
  setCartCount: Dispatch<SetStateAction<number>>;
}

export default function NFTContainer({ setCartCount }: NFTContainerProps) {
  const { data, isLoading, isError } = useQuery<NFT[]>({
    queryKey: ['nfts'],
    queryFn: fetchNFTs,
  });

  if (isLoading) return <p>Carregando NFTs...</p>;

  if (isError) return <p>Erro ao carregar NFTs 😢</p>;

  const exemploNFT: NFT = {
    id: 1,
    nome: 'Lorem Ipsum',
    descricao: 'Redesigned from scratch and completely revised.',
    preco: 32,
    imagem: '/assets/NFTS/img1.png',
    icone: '/assets/Icons/Ethereum.svg',
  };

  const nftsParaExibir = data?.length ? data : [exemploNFT];

  return (
    <div className="container-NFT">
      {nftsParaExibir?.map((nft) => (
        <CardNFT
          key={nft.id}
          nome={nft.nome}
          descricao={nft.descricao}
          preco={nft.preco}
          imagem={nft.imagem}
          imagemIcone={nft.icone}
          setCartCount={setCartCount}
        />
      ))}
    </div>
  );
}

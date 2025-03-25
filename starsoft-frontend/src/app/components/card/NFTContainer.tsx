'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNFTs } from '../../service/api';
import CardNFT from './NFTCard';
import { Dispatch, SetStateAction } from 'react';

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

const exemploNFTs: NFT[] = [
  {
    id: 1,
    nome: 'Galaxy Ape',
    descricao: 'Um NFT cósmico cheio de estilo!',
    preco: 45,
    imagem: '/assets/NFTS/img1.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
  {
    id: 2,
    nome: 'Cyber Cat',
    descricao: 'Gato digital do futuro, pronto pra ação.',
    preco: 38,
    imagem: '/assets/NFTS/img2.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
  {
    id: 3,
    nome: 'Pixel Dragon',
    descricao: 'Dragão pixelado que guarda tesouros raros.',
    preco: 60,
    imagem: '/assets/NFTS/img3.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
  {
    id: 4,
    nome: 'Meta Punk',
    descricao: 'Estilo retrô com alma de NFT.',
    preco: 50,
    imagem: '/assets/NFTS/img4.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
  {
    id: 5,
    nome: 'Meta Punk',
    descricao: 'Estilo retrô com alma de NFT.',
    preco: 50,
    imagem: '/assets/NFTS/img4.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
  {
    id: 6,
    nome: 'Meta Punk',
    descricao: 'Estilo retrô com alma de NFT.',
    preco: 50,
    imagem: '/assets/NFTS/img4.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
  {
    id: 7,
    nome: 'Meta Punk',
    descricao: 'Estilo retrô com alma de NFT.',
    preco: 50,
    imagem: '/assets/NFTS/img4.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
  {
    id: 8,
    nome: 'Meta Punk',
    descricao: 'Estilo retrô com alma de NFT.',
    preco: 50,
    imagem: '/assets/NFTS/img4.png',
    icone: '/assets/Icons/Ethereum.svg',
  },
];

export default function NFTContainer({ setCartCount }: NFTContainerProps) {
  const { data, isLoading, isError } = useQuery<NFT[]>({
    queryKey: ['nfts'],
    queryFn: fetchNFTs,
  });

  const nftsParaExibir = data?.length ? data : exemploNFTs;

  return (
    <div className="container-NFT">
      {nftsParaExibir.map((nft) => (
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

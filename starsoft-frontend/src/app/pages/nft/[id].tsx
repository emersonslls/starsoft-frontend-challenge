'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNFTDetails } from '../../service/api'; // Importa a função para buscar detalhes de uma NFT
import { useRouter } from 'next/router'; // Para capturar o id da URL
import { Dispatch, SetStateAction } from 'react';
import LoadingScreen from '@/app/components/loading/Loading';

interface NFTDetailsProps {
  setCartCount: Dispatch<SetStateAction<number>>;
}

interface NFT {
  id: number;
  nome: string;
  descricao: string;
  preco: number | string;
  imagem: string;
  icone: string;
}

export default function NFTDetails({ setCartCount }: NFTDetailsProps) {
  const router = useRouter();
  const { id } = router.query; // Captura o id da URL

  const { data, isLoading, isError } = useQuery<NFT>({
    queryKey: ['nft', id],
    queryFn: () => fetchNFTDetails(id as string), // Chama a API passando o id
    enabled: !!id, // Só faz a requisição quando o id estiver disponível
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <div>Erro ao carregar os dados da NFT</div>;
  }

  if (!data) {
    return <div>NFT não encontrada</div>;
  }

  return (
    <div className="nft-details">
      <h1>{data.nome}</h1>
      <p>{data.descricao}</p>
      <img src={data.imagem} alt={data.nome} />
      <h2>{data.preco} ETH</h2>

      {/* Aqui você pode adicionar mais funcionalidades, como adicionar ao carrinho */}
    </div>
  );
}

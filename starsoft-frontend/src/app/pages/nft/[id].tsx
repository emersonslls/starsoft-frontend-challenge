// pages/nft/[id].tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getNFTById } from '../../service/api' // Função para pegar um NFT específico
import CardNFT from '../../components/card/NFTCard'

export default function NFTDetail() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, isError } = useQuery({
    queryKey: ['nft', id], // A chave única com id
    queryFn: () => getNFTById(id as string), // Passa o ID para a requisição
    enabled: !!id, // Só executa a requisição quando o id estiver disponível
  })

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar NFT</div>

  return (
    <div>
      <CardNFT
        nome={data.nome}
        descricao={data.descricao}
        preco={data.preco}
        imagem={data.imagem}
        imagemIcone={data.imagemIcone}
      />
    </div>
  )
}

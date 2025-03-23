// components/NFTContainer.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import CardNFT from './NFTCard'
import { getNFTs } from '../../service/api' // A função que faz a requisição à API

export default function NFTContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['nfts'],
    queryFn: getNFTs,
  })

  if (isLoading) return <div>Carregando NFTs...</div>
  if (isError) return <div>Erro ao carregar NFTs</div>

  return (
    <div className='container-NFT'>
      {data.map((nft: any) => (
        <CardNFT
          key={nft.id}
          nome={nft.nome}
          descricao={nft.descricao}
          preco={nft.preco}
          imagem={nft.imagem}
          imagemIcone={nft.imagemIcone}
        />
      ))}
    </div>
  )
}

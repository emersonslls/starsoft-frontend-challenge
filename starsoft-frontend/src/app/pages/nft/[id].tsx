import { useNFT } from '@/app/hooks/useNFTs';
import { useRouter } from 'next/router';

const NftDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { data, error, isLoading } = useNFT(id as string);

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  if (!data) return <div>NFT não encontrada.</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.imageUrl} alt={data.name} />
      <p>Preço: ${data.price}</p>
      <p>{data.description}</p>
    </div>
  );
};

export default NftDetailPage;

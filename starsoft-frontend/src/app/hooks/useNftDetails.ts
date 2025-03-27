import { useQuery } from '@tanstack/react-query';

interface Nft {
  name: string;
  image_url: string;
  description: string;
  price: string;
}

export const useNftDetails = (id: string) => {
  return useQuery<Nft, Error>({
    queryKey: ['nftDetails', id], // Passar queryKey dentro de um objeto de configuração
    queryFn: async () => {
      const res = await fetch(`https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products/${id}`);
      if (!res.ok) {
        throw new Error('Erro ao carregar os detalhes do produto.');
      }
      return res.json();
    },
  });
};

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products';

// Hook para buscar TODOS os NFTs
export const useNFTs = () => {
  return useQuery({
    queryKey: ['nfts'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}?page=1&limit=100`);
      return data;
    },
  });
};

// Hook para buscar 1 NFT por ID
export const useNFT = (id: string | number) => {
  return useQuery({
    queryKey: ['nft', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}?page=1&limit=100`);
      return data.find((item: { id: number }) => item.id === Number(id));
    },
    enabled: !!id,
  });
};

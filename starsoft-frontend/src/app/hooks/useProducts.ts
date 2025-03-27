import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async () => {
  const response = await axios.get('https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=20');
  return response.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

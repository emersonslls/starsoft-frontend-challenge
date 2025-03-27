// src/hooks/useNfts.ts
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchNfts = async () => {
  const { data } = await axios.get(
    'https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=20'
  )
  return data.products
}

export const useNfts = () => {
  return useQuery({
    queryKey: ['nfts'],
    queryFn: fetchNfts,
  })
}

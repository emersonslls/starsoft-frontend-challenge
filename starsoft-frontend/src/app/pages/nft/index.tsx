
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function NftList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["nfts"],
    queryFn: async () => {
      const res = await axios.get("https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=20");
      return res.data.data;
    },
  });

  if (isLoading) return <div>Carregando NFTs...</div>;
  if (error instanceof Error) return <div>Erro ao carregar NFTs: {error.message}</div>;

  return (
    <div>
      <h1>Lista de NFTs</h1>
      <ul>
        {data?.map((nft: any) => (
          <li key={nft.id}>
            <a href={`/nft/${nft.id}`}>
              <h2>{nft.name}</h2>
              <img src={nft.imageUrl} alt={nft.name} width={100} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

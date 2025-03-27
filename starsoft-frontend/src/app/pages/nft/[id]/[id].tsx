// src/app/nft/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function NftDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["nft", id],
    queryFn: async () => {
      const res = await axios.get(`https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Carregando NFT...</div>;
  if (error instanceof Error) return <div>Erro ao carregar NFT: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.imageUrl} alt={data.name} width={200} />
      <p>ID: {data.id}</p>
      <p>Descrição: {data.description}</p>
    </div>
  );
}

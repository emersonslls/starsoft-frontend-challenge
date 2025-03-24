// src/components/Card/ClientComponent.tsx
'use client';

import { useEffect, useState } from 'react';

interface ClientProps {
  clientData: {
    id: number;
    name: string;
    // outras propriedades simples aqui
  };
}

const ClientComponent = ({ clientData }: ClientProps) => {
  const [data, setData] = useState(clientData);

  useEffect(() => {
    console.log('Rodando no cliente com os dados:', data);
  }, []);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">Dados do Cliente</h2>
      <p>ID: {data.id}</p>
      <p>Nome: {data.name}</p>
    </div>
  );
};

export default ClientComponent;

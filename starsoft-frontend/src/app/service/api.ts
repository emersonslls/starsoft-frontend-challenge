export const fetchNFTs = async () => {
  try {
    const response = await fetch('https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=8');

    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Log da resposta da API para verificar a estrutura dos dados
    console.log('Resposta da API:', data);

    // Aqui vamos tentar acessar a chave 'data' ou similar, se existir
    if (Array.isArray(data.data)) {
      return data.data; // Se a API retornar algo como { data: [...] }
    } else if (Array.isArray(data)) {
      return data; // Se a API retornar diretamente um array
    } else {
      throw new Error('A resposta da API não é um array');
    }
  } catch (error) {
    console.error('Erro na função fetchNFTs:', error);
    throw error; // Re-throw para ser capturado no componente
  }
};

// Função para buscar os dados de uma NFT específica
export const fetchNFTDetails = async (id: string) => {
  const response = await fetch(`https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar os detalhes da NFT');
  }

  const data = await response.json();

  // Verifique se a resposta é um objeto (detalhes de uma NFT)
  if (data && typeof data === 'object') {
    return data;
  } else {
    throw new Error('A resposta da API não contém os detalhes da NFT');
  }
};

export const fetchNFTs = async () => {
    const response = await fetch('https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=20');
    if (!response.ok) throw new Error('Erro ao buscar NFTs');
    return response.json();
  };
  
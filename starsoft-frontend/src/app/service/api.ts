// server/api.ts
import axios from 'axios'

const api = axios.create({
    baseURL: '/v1/products', // Substitua pela URL base da sua API
})

// Função para obter todos os NFTs
export const getNFTs = async () => {
    const response = await api.get('/nfts') // A rota para pegar todos os NFTs
    return response.data
}

// Função para pegar um NFT específico por ID
export const getNFTById = async (id: string) => {
    const response = await api.get(`/nfts/${id}`) // A rota para pegar um NFT específico
    return response.data
}

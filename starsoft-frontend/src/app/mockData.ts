// mockData.ts
import { CartItem } from './redux/cartSlice';

export const mockCartItems: CartItem[] = [
    {
        id: '1',
        nome: 'Produto 1',
        descricao: 'Descrição do Produto 1',
        preco: 10,
        quantidade: 1,
        image: '/path/to/image1.jpg',
    },
    {
        id: '2',
        nome: 'Produto 2',
        descricao: 'Descrição do Produto 2',
        preco: 20,
        quantidade: 2,
        image: '/path/to/image2.jpg',
    },
];

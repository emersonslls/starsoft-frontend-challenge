import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../pages/cart'; // Ajuste o caminho se necessário
import { CartItem } from '../redux/cartSlice'; // Importar o tipo CartItem
import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Ajuste o caminho do seu store Redux
import { mockCartItems } from '../mockData';

// Mockar as funções de fechamento do carrinho e finalização da compra
const mockCloseCart = jest.fn();
const mockFinalizePurchase = jest.fn();

describe('Cart', () => {
    beforeEach(() => {
        // Resetar mocks antes de cada teste
        mockCloseCart.mockClear();
        mockFinalizePurchase.mockClear();
    });

    it('deve renderizar o título "Mochila de Compras"', () => {
        render(
            <Provider store={store}>
                <Cart closeCart={mockCloseCart} finalizePurchase={mockFinalizePurchase} />
            </Provider>
        );

        expect(screen.getByText('Mochila de Compras')).toBeInTheDocument();
    });

    it('deve chamar closeCart quando o botão de fechar for clicado', () => {
        render(
            <Provider store={store}>
                <Cart closeCart={mockCloseCart} finalizePurchase={mockFinalizePurchase} />
            </Provider>
        );

        const button = screen.getByLabelText('Fechar carrinho');
        fireEvent.click(button);

        expect(mockCloseCart).toHaveBeenCalledTimes(1);
    });

    it('deve mostrar a mensagem de erro se o carrinho estiver vazio', () => {
        render(
            <Provider store={store}>
                <Cart closeCart={mockCloseCart} finalizePurchase={mockFinalizePurchase} />
            </Provider>
        );

        const button = screen.getByText('FINALIZAR COMPRA');
        fireEvent.click(button);

        expect(screen.getByText('Erro: O carrinho está vazio')).toBeInTheDocument();
    });

    it('deve finalizar a compra e limpar o carrinho', () => {
        // Suponha que mockCartItems seja um array de itens fictícios do carrinho
        render(
            <Provider store={store}>
                <Cart closeCart={mockCloseCart} finalizePurchase={mockFinalizePurchase} />
            </Provider>
        );

        const button = screen.getByText('FINALIZAR COMPRA');
        fireEvent.click(button);

        expect(mockFinalizePurchase).toHaveBeenCalledTimes(1);
        expect(mockCloseCart).toHaveBeenCalledTimes(1);
    });
});

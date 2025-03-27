import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardNFT from '../components/card/NFTCard';
import cartReducer from '../redux/cartSlice';

expect.extend(toHaveNoViolations);

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe('CardNFT', () => {
  it('não possui violações de acessibilidade', async () => {
    const { container } = render(
      <Provider store={store}>
        <CardNFT
          name="NFT Teste"
          description="Descrição do NFT"
          price={10}
          image="/fake-nft.png" // usa string simples para evitar conflito
          setCartCount={jest.fn()}
        />
      </Provider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('exibe corretamente o nome do NFT', () => {
    render(
      <Provider store={store}>
        <CardNFT
          name="NFT Teste"
          description="Descrição do NFT"
          price={10}
          image="/fake-nft.png"
          setCartCount={jest.fn()}
        />
      </Provider>
    );

    const nameElement = screen.getByText(/NFT Teste/i);
    expect(nameElement).toBeInTheDocument();
  });

  it('exibe corretamente o preço do NFT', () => {
    render(
      <Provider store={store}>
        <CardNFT
          name="NFT Teste"
          description="Descrição do NFT"
          price={10}
          image="/fake-nft.png"
          setCartCount={jest.fn()}
        />
      </Provider>
    );

    const priceElement = screen.getByText(/10 ETH/i);
    expect(priceElement).toBeInTheDocument();
  });

  it('dispara a função setCartCount quando o botão de adicionar ao carrinho é clicado', () => {
    const mockSetCartCount = jest.fn();

    render(
      <Provider store={store}>
        <CardNFT
          name="NFT Teste"
          description="Descrição do NFT"
          price={10}
          image="/fake-nft.png"
          setCartCount={mockSetCartCount}
        />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /comprar/i });
    fireEvent.click(button);

    expect(mockSetCartCount).toHaveBeenCalledTimes(1);
  });
});

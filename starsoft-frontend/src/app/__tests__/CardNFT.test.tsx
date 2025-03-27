// __tests__/CardNFT.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardNFT from '../components/card/NFTCard';
import { Provider } from 'react-redux';
import { store } from '@/app/redux/store';

const mockProps = {
  name: 'NFT Legal',
  description: 'Uma NFT incrível!',
  price: '1.25',
  image: '/assets/nft-test.jpg',
  setCartCount: jest.fn(),
};

describe('CardNFT Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza nome, descrição e preço', () => {
    render(
      <Provider store={store}>
        <CardNFT {...mockProps} />
      </Provider>
    );

    expect(screen.getByText('NFT Legal')).toBeInTheDocument();
    expect(screen.getByText('Uma NFT incrível!')).toBeInTheDocument();
    expect(screen.getByText('1.25 ETH')).toBeInTheDocument();
  });

  it('altera o botão para "Adicionar ao carrinho" ao clicar em "Comprar"', () => {
    render(
      <Provider store={store}>
        <CardNFT {...mockProps} />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /Comprar/i });
    fireEvent.click(button);

    expect(screen.getByText(/Adicionar ao carrinho/i)).toBeInTheDocument();
  });

  it('adiciona ao carrinho e mostra mensagem de sucesso ao clicar no botão duas vezes', async () => {
    render(
      <Provider store={store}>
        <CardNFT {...mockProps} />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /Comprar/i });

    // Primeiro clique: muda estado para "Adicionar ao carrinho"
    fireEvent.click(button);

    // Segundo clique: dispara ação de adicionar ao carrinho
    fireEvent.click(screen.getByRole('button', { name: /Adicionar ao carrinho/i }));

    // Espera pela mensagem de sucesso
    await waitFor(() => {
      expect(screen.getByText(/Compra efetuada com sucesso/i)).toBeInTheDocument();
    });

    expect(mockProps.setCartCount).toHaveBeenCalled();
  });

  it('abre o modal ao clicar na imagem', () => {
    render(
      <Provider store={store}>
        <CardNFT {...mockProps} />
      </Provider>
    );

    const image = screen.getByAltText(/NFT Legal/i);
    fireEvent.click(image);

    expect(screen.getByText(/NFT Legal/i)).toBeInTheDocument(); // modal contém o nome
    expect(screen.getByText(/Uma NFT incrível!/i)).toBeInTheDocument(); // modal contém descrição
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import CardNFT from '../components/card/NFTCard';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('CardNFT Component', () => {

  afterEach(async () => {
    const results = await axe(document.body);
    if (results.violations.length > 0) {
      console.log('Acessibilidade Violations:', results.violations);
    }
    expect(results).toHaveNoViolations();
  });

  test('should render and add item to cart', async () => {
    const mockSetCartCount = jest.fn();

    render(
      <Provider store={store}>
        <CardNFT 
          name="NFT Test"
          description="Test Description"
          price={1.5}
          image="https://via.placeholder.com/150"
          setCartCount={mockSetCartCount}
        />
      </Provider>
    );

    // Verificar se os textos estão na tela
    expect(screen.getByText('NFT Test')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Verificar se o botão de compra está na tela
    const buyButton = screen.getByRole('button', { name: /comprar/i });
    expect(buyButton).toBeInTheDocument();

    // Clicar no botão de comprar
    fireEvent.click(buyButton);

    // Verificar se a função mock foi chamada
    expect(mockSetCartCount).toHaveBeenCalledTimes(1);

    // Verificar se o botão de "adicionar ao carrinho" (ou similar) está presente
    const addToCartButton = screen.getByRole('button', { name: /adicionar ao carrinho/i });
    expect(addToCartButton).toBeInTheDocument();
    
    // Caso o botão mude após a ação, você pode verificar se o comportamento esperado ocorreu, por exemplo:
    // expect(screen.queryByRole('button', { name: /comprar/i })).not.toBeInTheDocument();
  });
});

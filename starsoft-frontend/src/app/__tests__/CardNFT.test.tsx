// src/app/__tests__/CardNFT.test.tsx

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

    expect(screen.getByText('NFT Test')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    const buyButton = screen.getByRole('button', { name: /comprar/i });
    expect(buyButton).toBeInTheDocument();

    fireEvent.click(buyButton);

    expect(mockSetCartCount).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /adicionar ao carrinho/i })).toBeInTheDocument();
  });
});

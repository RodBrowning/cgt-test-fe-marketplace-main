import { rest } from 'msw';
import { server } from '../../mocks/server';

import user from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import { addToCart } from '../../features/cart/cartSlice';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../app/store';

import App from '../../App';
import Products from '.';

const product = 
  {
    id: 100,
    brand: "brandA",
    title: "titleA",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
    freeShipping: true,
    newest: true,
    price: {
        value: 15,
        oldValue: 20,
        shipping: 2,
        currencyInfo: {
            locale: "en-GB",
            currencyCode: "GBP"
        }
    },
    imageURL: "http://localhost:8080/images/TomyPocketGames.jpg",
    imageAlt: "Lorem ipsum dolor sit amet consectetur.",
    availableQuantity: 3,
    quantity: 2
  }
;

describe('Home page', () => {
  test('Render products page', async () => {
    renderWithProviders(<Products />);
    
    const newestTitle = await screen.findByRole('heading', {level: 1, name: "Newest"},{timeout: 2000});
    expect(newestTitle).toBeInTheDocument();
  
    const newestProducts = await screen.findByTestId('Newest-container');
    expect(newestProducts).toBeInTheDocument();
    expect(newestProducts.childElementCount).toBe(2);
  
    const productsTitle = await screen.findByRole('heading', {level: 1, name: "90's Products"},{timeout: 2000});
    expect(productsTitle).toBeInTheDocument();
    
    
    const allProducts = await screen.findByTestId('products-container');
    expect(allProducts).toBeInTheDocument();
    expect(allProducts.childElementCount).toBe(5);
      
  });
  
  test('Render with api error', async ()=>{
    server.use(
      rest.get('http://localhost:8080/products/', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    renderWithProviders(<App />);
    const error = await screen.findByRole('heading', {level: 1, name: "Was not possible to receive the data. Make sure to run Json-server in order to access the API. In a another terminal run the command 'npm run json-server'."})
    expect(error).toBeInTheDocument();
  });
  
  test('Add product to cart', async () => {    
    renderWithProviders(<Products />, { path: '/'});
    
    const addButton = await screen.findAllByRole('button', {name: 'Add to cart'});
    fireEvent.click(addButton[0]);
    const removeButton = await screen.findAllByRole('button', {name: 'Remove from cart'});
    expect(removeButton[0]).toBeInTheDocument();
  
  });
  
  test('Remove product from cart', async () => {  
    const str = setupStore();
    await str.dispatch(addToCart({...product}));
    
    renderWithProviders(<Products />, { path: '/', store: str });
  
    const removeButton = await screen.findAllByRole('button', {name: 'Remove from cart'});
    fireEvent.click(removeButton[0]);
    const addButton = await screen.findAllByRole('button', {name: 'Add to cart'});
    expect(addButton[0]).toBeInTheDocument();
  
   });

  
   test('Vertical cart redirection', async () => {
    renderWithProviders(<Products />, { path: '/' });

    let verticalCard = await screen.findAllByTestId('vertical-card');
    expect(verticalCard[0]).toBeInTheDocument();
    await user.click(verticalCard[0]);
    expect(await screen.findByRole('img')).toBeInTheDocument();
  });

  test('Horizontal card redirection', async () => {
    renderWithProviders(<Products />, { path: '/' });

    let horizontalCard = await screen.findAllByTestId('horizontal-card');
    expect(horizontalCard[0]).toBeInTheDocument();
    await user.click(horizontalCard[0]);
    expect(await screen.findByRole('img')).toBeInTheDocument();
  });

  test('Vertival card redirection', async () => {
    renderWithProviders(<Products />, { path: '/' });

    let verticalCard = await screen.findAllByTestId('vertical-card');
    expect(verticalCard[0]).toBeInTheDocument();
    await user.click(verticalCard[0]);
    expect(await screen.findByRole('img')).toBeInTheDocument();
  });
});

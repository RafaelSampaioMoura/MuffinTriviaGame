import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const nameTest = 'Joao';
const emailTest = 'joao@joao.com';

describe('Testa a página de login', () => {
  test('Renderiza a tela de login', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', {name: /nome:/i});
    const inputEmail = screen.getByRole('textbox', {name: /email:/i});
    const getBtn = screen.getByRole('button', {name: /play/i});

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    
    userEvent.type(inputName, nameTest);
    userEvent.type(inputEmail, emailTest);
    expect(getBtn).not.toBeDisabled();
  })

  test('Testa se botão altera a pagina', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {name: /nome:/i});
    const inputEmail = screen.getByRole('textbox', {name: /email:/i});
    
    
    userEvent.type(inputName, nameTest);
    userEvent.type(inputEmail, emailTest);
    const getBtn = screen.getByTestId('btn-play');
    userEvent.click(getBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/game'), { timeout: 10000 } );
  });

  test('Testa o redirecionamento do settings', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const getBtn = screen.getByTestId('btn-settings');
    userEvent.click(getBtn);

    expect(history.location.pathname).toBe('/settings');
  })
});

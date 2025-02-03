import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Adicionar Router
import '@testing-library/jest-dom';
import Login from './Login';

describe('Jest', () => {
  it('should work', () => {
    expect(1).toBe(1);
  });
});

describe('<Login />', () => {
  it('should render', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Route>
          <Login />
        </Route>
      </BrowserRouter>
    );

    expect(getByText('Bem-vindo')).toBeInTheDocument();
    expect(getByText("Seu treino te aguarda")).toBeInTheDocument();
  });
});
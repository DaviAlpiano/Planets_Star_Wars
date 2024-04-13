import React from 'react';
import { vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { dataMock } from './mock';
import renderWithContext from './renderwithcontext';
import App from '../App';
import { screen } from '@testing-library/react';

describe('Testando as informações na tela inicial estão de acordo com o esperado.', async () => {
  it('Ao renderizar a página é encontrado o nome Planets Star Wars e a caixa para pesquisa do nome do planeta.', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataMock
    } as Response);

    renderWithContext(<App/>);

    const nameSW = screen.getByRole('heading', {  name: /planets star wars/i});
    const namePlanet = screen.getByRole('textbox');

    expect(nameSW).toBeInTheDocument();
    expect(namePlanet).toBeInTheDocument();
  });

  it('Ao renderizar a página é encontrado os componentes de filtragem e ordem.', () => {
    renderWithContext(<App/>);

    const coluna = screen.getByRole('combobox', {  name: /coluna/i});
    const operador = screen.getByRole('combobox', {  name: /operador/i});
    const valor = screen.getByRole('spinbutton');
    const buttonFilter = screen.getByRole('button', {  name: /filter/i});
    const ordenar = screen.getByRole('combobox', {  name: /ordenar/i});
    const asc = screen.getByText(/ascendente/i);
    const desc = screen.getByText(/descendente/i);
    const buttonOrdem = screen.getByRole('button', {  name: /ordenar/i});
    const buttonRemoveFilters = screen.getByRole('button', {  name: /remover todos filtros/i});

    expect(coluna).toBeInTheDocument();
    expect(operador).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(ordenar).toBeInTheDocument();
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(buttonOrdem).toBeInTheDocument();
    expect(buttonRemoveFilters).toBeInTheDocument();
  });

  it('Ao renderizar a página é encontrado a tabela e suas colunas.', () => {
    renderWithContext(<App/>);

    const table = screen.getByRole('table');
    const name = screen.getByRole('columnheader', {  name: /name/i});
    const rp = screen.getByRole('columnheader', {  name: /rotation period/i});
    const op = screen.getByRole('columnheader', {  name: /orbital period/i});
    const diameter = screen.getByRole('columnheader', {  name: /diameter/i});
    const climate = screen.getByRole('columnheader', {  name: /climate/i});
    const gravity = screen.getByRole('columnheader', {  name: /gravity/i});
    const terrain = screen.getByRole('columnheader', {  name: /terrain/i});
    const sw = screen.getByRole('columnheader', {  name: /surface water/i});
    const population = screen.getByRole('columnheader', {  name: /population/i});
    const films = screen.getByRole('columnheader', {  name: /films/i});
    const created = screen.getByRole('columnheader', {  name: /created/i});

    expect(table).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(rp).toBeInTheDocument();
    expect(op).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(gravity).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(sw).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(films).toBeInTheDocument();
    expect(created).toBeInTheDocument();
  });
});


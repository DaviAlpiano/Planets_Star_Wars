import { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import { ColunaType, InfoFilter, Planet } from '../types';

type ThemeProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: ThemeProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filterList, setFilterList] = useState<InfoFilter[]>([]);
  const [name, setName] = useState<string>('');

  const colunas = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  useEffect(() => {
    const FetchApi = async () => {
      try {
        const dados = await fetch('https://swapi.dev/api/planets');
        const resultado = await dados.json();
        const noResidents = resultado.results.map((planet: Planet) => {
          delete planet.residents;
          return planet;
        });
        setPlanets(noResidents);
      } catch (erro) {
        console.error(erro);
      }
    };

    FetchApi();
  }, []);

  const filteredName = (param:string) => {
    setName(param);
  };

  const addFilter = (filter:InfoFilter) => {
    setFilterList((prevFilter) => [...prevFilter, filter]);
  };

  const removeFilter = (coluna: ColunaType) => {
    setFilterList(filterList.filter((filter) => filter.coluna !== coluna));
  };

  const removeAllFilters = () => {
    setFilterList([]);
  };

  const value = {
    planets,
    colunas,
    filterList,
    name,
    filteredName,
    addFilter,
    removeFilter,
    removeAllFilters,
  };

  return (
    <PlanetsContext.Provider value={ value }>
      { children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

import { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import { Planet } from '../types';

type ThemeProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: ThemeProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [planetsFilter, setPlanetsFilter] = useState<Planet[]>([]);

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
        setPlanetsFilter(noResidents);
      } catch (erro) {
        console.error(erro);
      }
    };

    FetchApi();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets, planetsFilter, setPlanetsFilter } }>
      { children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

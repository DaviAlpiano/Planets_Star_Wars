import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { InfoFilter, Planet } from '../types';

function Filter() {
  const { planets, planetsFilter, setPlanetsFilter } = useContext(PlanetsContext);
  const [info, setInfo] = useState<InfoFilter>({ coluna: 'population',
    operador: 'maior que',
    number: 0 });

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const valor = e.currentTarget.value;
    const newPlanets = planets.filter((planet) => planet.name.includes(valor));
    setPlanetsFilter(newPlanets);
  }

  function infoChange(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const valor = e.currentTarget.value;
    const filterId = e.currentTarget.id;
    setInfo({ ...info, [filterId]: valor });
  }

  function filterChange() {
    let filteredPlanets;
    switch (info.operador) {
      case 'maior que':
        filteredPlanets = planetsFilter
          .filter((planet:Planet) => Number(planet[info
            .coluna as keyof Planet]) > Number(info.number));
        setPlanetsFilter(filteredPlanets);
        break;
      case 'menor que':
        filteredPlanets = planetsFilter
          .filter((planet:Planet) => Number(planet[info
            .coluna as keyof Planet]) < Number(info.number));
        setPlanetsFilter(filteredPlanets);
        break;
      case 'igual a':
        filteredPlanets = planetsFilter
          .filter((planet:Planet) => Number(planet[info
            .coluna as keyof Planet]) === Number(info.number));
        setPlanetsFilter(filteredPlanets);
        break;
      default:
        console.log('Erro na escolha');
    }
  }

  return (
    <div>
      <input type="text" data-testid="name-filter" onChange={ handleChange } />
      <div>
        <label htmlFor="coluna">
          Coluna
          <select
            onChange={ infoChange }
            data-testid="column-filter"
            name="coluna"
            id="coluna"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="operador">
          Operador
          <select
            onChange={ infoChange }
            data-testid="comparison-filter"
            name="operador"
            id="operador"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          onChange={ infoChange }
          type="number"
          id="number"
          value={ info.number }
          data-testid="value-filter"
        />
        <button onClick={ filterChange } data-testid="button-filter">Filter</button>
      </div>
    </div>
  );
}

export default Filter;

import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { InfoFilter, Planet, TypeFilter } from '../types';

function Filter() {
  const { planets, planetsFilter, setPlanetsFilter } = useContext(PlanetsContext);
  const [info, setInfo] = useState<InfoFilter>({ coluna: 'population',
    operador: 'maior que',
    number: 0 });
  const [colunas, setColunas] = useState<string[]>([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filter, setFilter] = useState<TypeFilter[]>([]);

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
    const filteredPlanets = planetsFilter.filter((planet) => {
      const planetValue = Number(planet[info.coluna as keyof Planet]);
      const filterValue = Number(info.number);

      switch (info.operador) {
        case 'maior que':
          return planetValue > filterValue;
        case 'menor que':
          return planetValue < filterValue;
        case 'igual a':
          return planetValue === filterValue;
        default:
          return false;
      }
    });
    const newinfos = colunas.filter((coluna) => coluna !== info.coluna);
    setPlanetsFilter(filteredPlanets);
    setInfo({ ...info, coluna: newinfos[0] });
    setColunas(newinfos);
    setFilter([...filter, {
      coluna: info.coluna,
      comparação: info.operador,
      valor: info.number.toString() }]);
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
            {colunas.map((coluna) => (
              <option
                key={ coluna }
                value={ coluna }
              >
                {coluna}
              </option>))}
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
      <div>
        {filter.map((filte) => (
          <h3 key={ filte.coluna }>
            {filte.coluna}
            {' '}
            {filte.comparação}
            {' '}
            {filte.valor}
          </h3>))}
      </div>
    </div>
  );
}

export default Filter;

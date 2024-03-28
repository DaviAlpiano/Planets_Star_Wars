import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { ColunaType, InfoFilter } from '../types';

function Filter() {
  const { colunas,
    filterList,
    addFilter,
    removeFilter,
    removeAllFilters,
    filteredName } = useContext(PlanetsContext);
  const [info, setInfo] = useState<InfoFilter>({ coluna: 'population',
    operador: 'maior que',
    number: 0 });

  const coluns = filterList.map(({ coluna }) => coluna) as string[];

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const valor = e.currentTarget.value;
    filteredName(valor);
  }

  function infoChange(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const valor = e.currentTarget.value;
    const filterId = e.currentTarget.id;
    setInfo({ ...info, [filterId]: valor });
  }

  function filtered() {
    addFilter(info);
  }

  function removedFilter(e:ColunaType) {
    removeFilter(e);
  }

  const columfiltered = colunas.filter((elemente) => !coluns.includes(elemente));

  useEffect(() => {
    setInfo({ ...info, coluna: columfiltered[0] as ColunaType });
  }, [filterList]);

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
            {columfiltered.map((coluna) => (
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
        <button
          onClick={ filtered }
          data-testid="button-filter"
          disabled={ columfiltered.length === 0 }
        >
          Filter
        </button>
        <button
          disabled={ filterList.length === 0 }
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover todos filtros
        </button>
      </div>
      <div>
        {filterList.map((filte) => (
          <div key={ filte.coluna } data-testid="filter">
            <h3>
              {filte.coluna}
              {' '}
              {filte.operador}
              {' '}
              {filte.number}
            </h3>
            <button onClick={ () => removedFilter(filte.coluna) }>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;

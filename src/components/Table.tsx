import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { Planet } from '../types';

function Table() {
  const context = useContext(PlanetsContext);
  const { planets, filterList, name, ordenando } = context;
  const valor = ordenando.ordenar;
  const aord = ordenando.ordem;

  const filters = () => (
    planets.filter((info) => info.name.toLowerCase()
      .includes(name.toLowerCase()))
      .filter((planet) => (
        filterList.every(({ coluna, operador, number }) => {
          switch (operador) {
            case 'maior que':
              return Number(planet[coluna]) > Number(number);
            case 'menor que':
              return Number(planet[coluna]) < Number(number);
            case 'igual a':
              return Number(planet[coluna]) === Number(number);
            default:
              return false;
          }
        })
      ))
  );

  const ordemASC = (planetas:Planet[]) => (
    planetas.sort((a:Planet, b:Planet) => {
      if (a[valor] === 'unknown' && b[valor] !== 'unknown') {
        return 1;
      } if (b[valor] === 'unknown' && a[valor] !== 'unknown') {
        return -1;
      }
      return a[valor] - b[valor];
    })
  );

  const ordemDESC = (planetas:Planet[]) => (
    planetas.sort((a:Planet, b:Planet) => {
      if (a[valor] === 'unknown' && b[valor] !== 'unknown') {
        return 1;
      } if (b[valor] === 'unknown' && a[valor] !== 'unknown') {
        return -1;
      }
      return b[valor] - a[valor];
    })
  );

  const ordem = (planetas:Planet[]) => {
    if (aord === 'ASC') {
      const ordenado = ordemASC(planetas);

      return ordenado;
    }
    if (aord === 'DESC') {
      const ordenado = ordemDESC(planetas);
      return ordenado;
    }
    return planetas;
  };

  return (
    <div>
      <table border={ 1 }>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {ordem(filters()).map((planet) => (
            <tr key={ planet.name }>
              <th data-testid="planet-name">{planet.name}</th>
              <th>{planet.rotation_period}</th>
              <th>{planet.orbital_period}</th>
              <th>{planet.diameter}</th>
              <th>{planet.climate}</th>
              <th>{planet.gravity}</th>
              <th>{planet.terrain}</th>
              <th>{planet.surface_water}</th>
              <th>{planet.population}</th>
              <th>{planet.films}</th>
              <th>{planet.created}</th>
              <th>{planet.edited}</th>
              <th>{planet.url}</th>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

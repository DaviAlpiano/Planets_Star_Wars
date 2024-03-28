import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const context = useContext(PlanetsContext);
  const { planets, filterList, name } = context;

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
          {filters().map((planet) => (
            <tr key={ planet.name }>
              <th>{planet.name}</th>
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

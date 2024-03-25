import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { planets, setPlanetsFilter } = useContext(PlanetsContext);

  function handleChange(e) {
    const valor = e.currentTarget.value;
    const newPlanets = planets.filter((planet) => planet.name.includes(valor));
    setPlanetsFilter(newPlanets);
  }
  return (
    <div>
      <input type="text" data-testid="name-filter" onChange={ handleChange } />
    </div>
  );
}

export default Filter;

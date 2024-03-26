export type Planet = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents?: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

export type PlanetsContextType = {
  planets: Planet[],
  planetsFilter: Planet[],
  setPlanetsFilter: React.Dispatch<React.SetStateAction<Planet[]>>,
};

export type InfoFilter = {
  coluna: string,
  operador: string,
  number: number,
};

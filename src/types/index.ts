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

export type ColunaType = 'population' |
'orbital_period' |
'diameter' |
'rotation_period' |
'surface_water';

export type PlanetsContextType = {
  planets: Planet[],
  colunas: string[],
  filterList:InfoFilter[],
  name:string,
  ordenando: InfoOrdem,
  filteredName: (param:string) => void,
  addFilter: (param:InfoFilter) => void,
  removeFilter: (param:ColunaType) => void,
  removeAllFilters: () => void,
  filterOrder: (param:InfoOrdem) => void,
};

export type InfoFilter = {
  coluna: ColunaType,
  operador: string,
  number: number,
};

export type InfoOrdem = {
  ordenar: string,
  ordem: string,
};

export interface Starship {
  id: string;
  costInCredits: number;
  hyperdriveRating: number;
  passengers: number;
  cargoCapacity: number;
  name: string;
  crew: number;
  length: number;
  manufacturer: string[];
  maxAtmospheringSpeed: number;
  mglt: number;
  consumables: string;
  model: string;
}

export type Starships = Pick<Starship, 'id' | 'name'>[];

export interface GetStarshipsResponse {
  allStarships: {
    totalCount: number;
    starships: Starships;
  };
}

export interface GetStarshipsVariables {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

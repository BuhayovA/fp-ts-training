import { Person } from '@md-shared/types/person';

export type GetPerson = Pick<Person, 'id' | 'name' | 'birthYear' | 'eyeColor' | 'hairColor' | 'skinColor' | 'gender'>;
export type People = GetPerson[];

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface GetPeopleResponse {
  allPeople: {
    totalCount: number;
    people: People;
    pageInfo: PageInfo;
  };
}

export interface GetPeopleVariables {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

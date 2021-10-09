import { Person } from '@md-shared/types/person';

export type GetPerson = Pick<Person, 'id' | 'name' | 'gender' | 'hairColor' | 'eyeColor' | 'birthYear'>;

export interface GetPersonResponse {
  person: GetPerson;
}

export interface GetPersonVariables {
  id?: string;
  personID?: string;
}

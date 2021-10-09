import { gql } from '@apollo/client';

export const GET_PERSON = gql`
  query Person($id: ID, $personID: ID) {
    person(id: $id, personID: $personID) {
      id
      name
      gender
      hairColor
      eyeColor
      birthYear
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_PEOPLE = gql`
  query AllPeople($after: String, $first: Int, $before: String, $last: Int) {
    allPeople(after: $after, first: $first, before: $before, last: $last) {
      totalCount
      people {
        id
        name
        gender
        eyeColor
        birthYear
        hairColor
        skinColor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

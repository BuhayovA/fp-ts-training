import React from 'react';
// libs
import styled from 'styled-components';
// utils
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as B from 'fp-ts/lib/boolean';
import { pipe } from 'fp-ts/lib/pipeable';
import { Do } from 'fp-ts-contrib/lib/Do';
import * as TE from 'fp-ts/lib/TaskEither';
// hooks
import { useQuery } from '@apollo/client';
import { useUIActions } from '@md-managers/use-ui-actions';
// query
import { GET_PEOPLE } from '@md-shared/queries/people';
// constants
import { solution } from '@md-modules/pagination-with-gql/constants';
// types
import { GetPeopleResponse, GetPeopleVariables } from '@md-shared/queries/people/types';
// components
import { CodeBlock } from '@md-shared/components/code-block';
import Card from '@md-modules/pagination-with-gql/components/card';
import { ContentLoader } from '@md-shared/components/content-loader';
import PaginationWithHasMore, { Direction } from '@md-shared/components/pagination/without-page-count';

// styles
export const ListWrapper = styled.div`
  position: relative;
  min-height: 504px;
`;

// constants
const ITEM_PER_PAGE = 6;

const PaginationWithGQLPage = () => {
  const { openToast, startProgress, doneProgress } = useUIActions();
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, refetch, loading, error } = useQuery<GetPeopleResponse, GetPeopleVariables>(GET_PEOPLE, {
    variables: { first: ITEM_PER_PAGE },
    notifyOnNetworkStatusChange: true
  });

  const hasPrevPage = currentPage > 1;
  const hasNextPage = (data?.allPeople.totalCount || 1) / ITEM_PER_PAGE > currentPage;

  // methods
  const refetchPage = (direction: Direction, endCursor?: string, startCursor?: string) =>
    Do(TE.taskEither)
      .bind(
        'noNullableEndCursor',
        pipe(
          O.fromNullable(endCursor),
          TE.fromOption(() => E.toError("Can't find next page!"))
        )
      )
      .bind(
        'noNullableStartCursor',
        pipe(
          O.fromNullable(startCursor),
          TE.fromOption(() => E.toError("Can't find previously page!"))
        )
      )
      .bindL('refetchRes', ({ noNullableStartCursor, noNullableEndCursor }) =>
        pipe(
          TE.tryCatch(
            () =>
              pipe(
                direction === 'NEXT',
                B.fold(
                  () => {
                    startProgress();

                    return refetch({
                      first: undefined,
                      after: undefined,
                      last: ITEM_PER_PAGE,
                      before: noNullableStartCursor
                    });
                  },
                  () => {
                    startProgress();

                    return refetch({
                      last: undefined,
                      before: undefined,
                      first: ITEM_PER_PAGE,
                      after: noNullableEndCursor
                    });
                  }
                )
              ).finally(doneProgress),
            E.toError
          )
        )
      )
      .return(({ refetchRes }) => refetchRes)();

  const onPageChange = (direction: Direction) =>
    refetchPage(direction, data?.allPeople.pageInfo.endCursor, data?.allPeople.pageInfo.startCursor).then((res) => {
      if (E.isRight(res)) {
        setCurrentPage((prevState) => prevState + (direction === 'NEXT' ? 1 : -1));
      }

      if (E.isLeft(res)) {
        openToast({ type: 'ERROR', error: res.left });

        // eslint-disable-next-line no-console
        console.log(res.left);
      }
    });

  return (
    <>
      <ListWrapper>
        <ContentLoader isLoading={loading} error={error?.message}>
          {data?.allPeople.people.map((i, index) => (
            <Card key={index} name={i.name} />
          ))}
        </ContentLoader>
      </ListWrapper>

      <PaginationWithHasMore
        page={currentPage}
        onPageChange={onPageChange}
        hasPrev={!loading && hasPrevPage}
        hasNext={!loading && hasNextPage}
      />

      <CodeBlock label='Pagination: [Solution]' codeTx={solution} />
    </>
  );
};

export default PaginationWithGQLPage;

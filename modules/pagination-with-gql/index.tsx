import React from 'react';
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
import Pagination from '@md-shared/components/pagination/main';
import { usePagination } from '@md-shared/hooks/use-pagination';
import Card from '@md-modules/pagination-with-gql/components/card';
import { ContentLoader } from '@md-shared/components/content-loader';

const ITEM_PER_PAGE = 6;

const PaginationWithGQLPage = () => {
  const [selectedPage, setSelectedPage] = React.useState(0);

  const { openToast, startProgress, doneProgress } = useUIActions();

  const { data, refetch, loading } = useQuery<GetPeopleResponse, GetPeopleVariables>(GET_PEOPLE, {
    variables: { first: ITEM_PER_PAGE },
    notifyOnNetworkStatusChange: true
  });

  const { pageCount } = usePagination({
    totalCount: data?.allPeople.totalCount || 0,
    itemsPerPage: ITEM_PER_PAGE
  });

  const onPageChange = (page: number) =>
    Do(TE.taskEither)
      .bind(
        'noNullableEndCursor',
        pipe(
          O.fromNullable(data?.allPeople.pageInfo.endCursor),
          TE.fromOption(() => E.toError("Can't find next page!"))
        )
      )
      .bind(
        'noNullableStartCursor',
        pipe(
          O.fromNullable(data?.allPeople.pageInfo.startCursor),
          TE.fromOption(() => E.toError("Can't find previously page!"))
        )
      )
      .bindL('refetchRes', ({ noNullableStartCursor, noNullableEndCursor }) =>
        pipe(
          TE.tryCatch(
            () =>
              pipe(
                page > selectedPage,
                B.fold(
                  () => {
                    startProgress();

                    return refetch({
                      last: undefined,
                      after: undefined,
                      first: ITEM_PER_PAGE,
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

  return (
    <>
      <div style={{ position: 'relative', minHeight: 500 }}>
        <ContentLoader isLoading={loading}>
          {data?.allPeople.people.map((i, index) => (
            <Card key={index} name={i.name} />
          ))}
        </ContentLoader>
      </div>

      <Pagination
        page={selectedPage}
        pageCount={pageCount}
        onPageChange={(selectedPage) =>
          onPageChange(selectedPage).then((res) => {
            if (E.isRight(res)) {
              setSelectedPage(selectedPage);
            }

            if (E.isLeft(res)) {
              openToast({ type: 'ERROR', error: res.left });

              // eslint-disable-next-line no-console
              console.log(res.left);
            }
          })
        }
      />

      <CodeBlock label='Pagination: [Solution]' codeTx={solution} />
    </>
  );
};

export default PaginationWithGQLPage;

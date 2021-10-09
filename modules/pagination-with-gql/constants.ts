export const solution = `
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
                      first: 'ITEM_PER_PAGE',
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
`;
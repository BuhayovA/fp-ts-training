export const solution = `
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
      .return(({ refetchRes }) => refetchRes);
`;

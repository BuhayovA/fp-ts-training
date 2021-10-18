export const solution = `
 const { data, refetch, loading, error } = useQuery<GetPeopleResponse, GetPeopleVariables>(GET_PEOPLE, {
    variables: { first: ITEM_PER_PAGE },
    notifyOnNetworkStatusChange: true
  });

  const { openToast, startProgress, doneProgress } = useUIActions();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isActive, setIsActive] = React.useState(false);

  const hasPrevPage = currentPage > 1;
  const hasNextPage = (data?.allPeople.totalCount || 1) / ITEM_PER_PAGE > currentPage;
  const policy = capDelay(500, exponentialBackoff(200));

  // methods
  const refetchPage = (status: RetryStatus, direction: Direction, endCursor?: string, startCursor?: string) =>
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
      .return(({ refetchRes }) => refetchRes.data.allPeople)();

  const logDelay = (delay: number) => TE.fromIO(log(\`retrying in {delay} milliseconds\`));

  const onPageChange = (direction: Direction) =>
    retrying(
      policy,
      (status) =>
        pipe(
          status.previousDelay,
          O.fold(
            refetchPage(
              status,
              direction,
              data?.allPeople.pageInfo.endCursor,
              data?.allPeople.pageInfo.startCursor
            ).then((res) => {
              if (E.isRight(res)) {
                setCurrentPage((prevState) => prevState + (direction === 'NEXT' ? 1 : -1));
              }

              if (E.isLeft(res)) {
                openToast({ type: 'ERROR', error: res.left });

                // eslint-disable-next-line no-console
                console.log(res.left);
              }
            }),
            (delay) =>
              logDelay(delay).applySecond(
                refetchPage(
                  status,
                  direction,
                  data?.allPeople.pageInfo.endCursor,
                  data?.allPeople.pageInfo.startCursor
                ).then((res) => {
                  if (E.isRight(res)) {
                    setCurrentPage((prevState) => prevState + (direction === 'NEXT' ? 1 : -1));
                  }

                  if (E.isLeft(res)) {
                    openToast({ type: 'ERROR', error: res.left });

                    // eslint-disable-next-line no-console
                    console.log(res.left);
                  }
                })
              )
          )
        ),

      E.isLeft
    );
`;

export const solutionIO = `
// states
const [isActive, setIsActive] = React.useState(false);

// policy
const policyIsLeft = capDelay(2000, monoidRetryPolicy.concat(exponentialBackoff(200), limitRetries(5)));

const policyIsRight = capDelay(5000, exponentialBackoff(5000));

// methods
const logDelayIsLeft = (status: RetryStatus) =>
  TE.rightIO(
    log(
      pipe(
        status.previousDelay,
        O.map((delay) => 'retrying in {delay} milliseconds...'),
        O.getOrElse(() => 'First attempt...')
      )
    )
  );

const loDelayIsRight = (status: RetryStatus) =>
  TE.rightIO(
    log(
      pipe(
        status.previousDelay,
        O.map((delay) => 'After {delay} milliseconds...'),
        O.getOrElse(() => 'Start...')
      )
    )
  );



const getSortEntities = (item?: string | null): TE.TaskEither<Error, RequestResponse<Person[]> | 'LAST_PAGE'> =>
  Do(TE.taskEither)
    .bind(
      'people',
      pipe(
        TE.tryCatch(
          () => window.fetch(item || REQUEST_URL),
          () => E.toError('Error')
        ),
        TE.chain((peopleRes) => TE.tryCatch<Error, RequestResponse<Person[]>>(() => peopleRes.json(), E.toError))
      )
    )

    .bindL<'peopleNextPage', RequestResponse<Person[]> | 'LAST_PAGE'>('peopleNextPage', ({ people }) =>
      pipe(
        !!people.next,
        B.fold(
          () => TE.right('LAST_PAGE'),
          () => getSortEntities(people.next)
        )
      )
    )
    .bindL<'result', RequestResponse<Person[]> | 'LAST_PAGE'>('result', ({ people, peopleNextPage }) =>
      pipe(
        peopleNextPage === 'LAST_PAGE',
        B.fold(
          () =>
            TE.right<Error, RequestResponse<Person[]>>({
              ...people,
              results: [...people.results, ...peopleNextPage.results]
            }),
          () => TE.right(peopleNextPage)
        )
      )
    )
    .return(({ result }) => result);

// retry
const firstStep = retrying(
  policyIsRight,
  (status) => pipe(loDelayIsRight(status), TE.apSecond(getSortEntities())),
  (e) => E.isRight(e) && e.right === 'LAST_PAGE'
);

const seconStep = retrying(policyIsLeft, (status) => pipe(logDelayIsLeft(status), TE.apSecond(firstStep)), E.isLeft);

const onClickStart = () => {
  setIsActive(true);

  seconStep()
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('[FINAL RESPONSE]: ', res);
    })
    .finally(() => setIsActive(false));
};

const onCancel = () => setIsActive(false);
`;

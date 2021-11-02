import React from 'react';
// utils
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import B from 'fp-ts/boolean';
import { log } from 'fp-ts/Console';
import { pipe } from 'fp-ts/pipeable';
import { Do } from 'fp-ts-contrib/Do';
import * as TE from 'fp-ts/TaskEither';
import { retrying } from 'retry-ts/Task';
import { flow } from 'fp-ts/lib/function';
import { capDelay, exponentialBackoff, limitRetries, monoidRetryPolicy, RetryStatus } from 'retry-ts';
// constants
import { solutionIO } from '@md-modules/fp-puller/constants';
// types
import { Starships } from '@md-modules/shared/queries/starships/types';
import { Person, RequestResponse, NewPerson } from '@md-modules/fp-puller/types';
// components
import { Button } from '@md-shared/components/button/main';
import { CodeBlock } from '@md-shared/components/code-block';
// views
import { ButtonsWrapper, ButtonWrapper } from '@md-modules/fp-puller/views';

const REQUEST_URL = 'https://swapi.dev/api/people';

const FPPuller = () => {
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
          O.map((delay) => `retrying in ${delay} milliseconds...`),
          O.getOrElse(() => 'First attempt...')
        )
      )
    );

  const loDelayIsRight = (status: RetryStatus) =>
    TE.rightIO(
      log(
        pipe(
          status.previousDelay,
          O.map((delay) => `After ${delay} milliseconds...`),
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
          B.foldW(
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
      // eslint-disable-next-line no-console
      .then((res) => console.log('[FINAL RESPONSE]: ', res))
      .finally(() => setIsActive(false));
  };

  const onCancel = () => setIsActive(false);

  return (
    <>
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button onClick={onClickStart} disabled={isActive || isActive} isLoading={isActive}>
            Start
          </Button>
        </ButtonWrapper>

        <Button onClick={onCancel} disabled={!isActive} preset='cancel'>
          Cancel
        </Button>
      </ButtonsWrapper>

      <CodeBlock codeTx={solutionIO} label='[Solution]' />
    </>
  );
};

export default FPPuller;

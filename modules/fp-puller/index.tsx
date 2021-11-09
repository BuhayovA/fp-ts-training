import React from 'react';
// utils
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import * as E from 'fp-ts/Either';
import { log } from 'fp-ts/Console';
import { pipe } from 'fp-ts/pipeable';
import { Do } from 'fp-ts-contrib/Do';
import * as TE from 'fp-ts/TaskEither';
import { retrying } from 'retry-ts/Task';
import { capDelay, exponentialBackoff, limitRetries, monoidRetryPolicy, RetryStatus } from 'retry-ts';
// types
import { Person, RequestResponse, Starship, NewPerson } from '@md-modules/fp-puller/types';
// components
import { Button } from '@md-shared/components/button/main';
// views
import { ButtonsWrapper, ButtonWrapper } from '@md-modules/fp-puller/views';

const REQUEST_URL = 'https://swapi.dev/api/people';

const FPPuller = () => {
  // states
  const buttonRef = React.useRef(false);

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

  const getSortEntities = (item: string | null): TE.TaskEither<Error, RequestResponse<NewPerson[]>> =>
    Do(TE.taskEither)
      .bind(
        'peopleRes',
        TE.tryCatch(
          () => window.fetch(item || REQUEST_URL),
          () => E.toError('Error')
        )
      )
      .bindL('people', ({ peopleRes }) =>
        TE.tryCatch<Error, RequestResponse<Person[]>>(() => peopleRes.json(), E.toError)
      )
      .bindL('peopleWithStarships', ({ people }) =>
        TE.right({
          ...people,
          results: pipe(
            people.results,
            A.map((person) => ({
              ...person,
              starships: pipe(
                person.starships,
                A.map((url) =>
                  pipe(
                    TE.tryCatch(() => window.fetch(url), E.toError),

                    TE.chain((starshipsRes) => TE.tryCatch<Error, Starship>(() => starshipsRes.json(), E.toError))
                  )
                )
              )
            }))
          )
        })
      )
      .bindL('peopleNextPage', ({ peopleWithStarships }) =>
        peopleWithStarships.next ? getSortEntities(peopleWithStarships.next) : TE.right(peopleWithStarships)
      )
      .return(({ peopleNextPage, peopleWithStarships }) =>
        peopleWithStarships.next
          ? { ...peopleNextPage, results: [...peopleWithStarships.results, ...peopleNextPage.results] }
          : peopleNextPage
      );

  // retry
  const firstRetryStep = retrying(
    policyIsRight,
    (status) => pipe(loDelayIsRight(status), TE.apSecond(getSortEntities(null))),
    (e) => E.isRight(e) && !e.right.next && buttonRef.current
  );

  const seconRetryStep = retrying(
    policyIsLeft,
    (status) => pipe(logDelayIsLeft(status), TE.apSecond(firstRetryStep)),
    (e) => E.isLeft(e) && e.left.message !== 'CANCEL'
  );

  const onClickStart = () => {
    buttonRef.current = true;

    setIsActive(true);

    seconRetryStep()
      // eslint-disable-next-line no-console
      .then((res) => console.log('[FINAL RESPONSE]: ', res))
      .finally(() => setIsActive(false));
  };

  const onCancel = () => {
    buttonRef.current = false;

    setIsActive(false);
  };

  return (
    <>
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button onClick={onClickStart} disabled={isActive} isLoading={isActive}>
            Start
          </Button>
        </ButtonWrapper>

        <Button onClick={onCancel} disabled={!isActive} preset='cancel'>
          Cancel
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default FPPuller;

import React from 'react';
// utils
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as B from 'fp-ts/boolean';
import * as T from 'fp-ts/Task';
import { log } from 'fp-ts/Console';
import { pipe } from 'fp-ts/pipeable';
import { Do } from 'fp-ts-contrib/Do';
import * as TE from 'fp-ts/TaskEither';
import { retrying } from 'retry-ts/Task';
import { flow } from 'fp-ts/lib/function';
import { capDelay, exponentialBackoff, limitRetries, monoidRetryPolicy, RetryStatus } from 'retry-ts';
// types
import { NewPerson, Person, RequestResponse } from '@md-modules/fp-puller/types';
// components
import { Button } from '@md-shared/components/button/main';
// views
import { ButtonsWrapper, ButtonWrapper } from '@md-modules/fp-puller/views';

const FPPuller = () => {
  // states
  const [isActive, setIsActive] = React.useState(false);
  const [state, setState] = React.useState<Person[]>([]);

  React.useEffect(() => console.log(state), [state]);

  // policy
  const policyIsLeft = capDelay(2000, monoidRetryPolicy.concat(exponentialBackoff(200), limitRetries(5)));

  const policyIsRight = capDelay(10000, exponentialBackoff(10000));

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

  const getSortEntities = Do(TE.taskEither)
    .bind(
      'peopleRes',
      TE.tryCatch(() => window.fetch('https://swapi.dev/api/people'), E.toError)
    )
    .bindL('people', ({ peopleRes }) =>
      TE.tryCatch<Error, RequestResponse<Person[]>>(() => peopleRes.json(), E.toError)
    )
    .return<RequestResponse<Person[]>>(({ people }) => {
      setState((prevState) => (prevState ? [...prevState, ...people.results] : people.results));

      return people;
    });

  // retrying
  const get = retrying(
    policyIsRight,
    (status) => pipe(loDelayIsRight(status), TE.apSecond(getSortEntities)),
    E.isRight
  );

  const result = retrying(policyIsLeft, (status) => pipe(logDelayIsLeft(status), TE.apSecond(get)), E.isLeft);

  const onClickStart = () => {
    setIsActive(true);

    result().then((res) => {
      setIsActive(false);

      // eslint-disable-next-line no-console
      console.log(res);
    });
  };

  const onCancel = () => setIsActive(false);

  return (
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
  );
};

export default FPPuller;

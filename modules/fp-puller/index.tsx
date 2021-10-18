import React from 'react';
// utils
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as B from 'fp-ts/boolean';
import { log } from 'fp-ts/Console';
import { pipe } from 'fp-ts/pipeable';
import { Do } from 'fp-ts-contrib/Do';
import * as TE from 'fp-ts/TaskEither';
import { retrying } from 'retry-ts/Task';
import { capDelay, exponentialBackoff, RetryStatus } from 'retry-ts';
// hooks
import { useQuery } from '@apollo/client';
import { useUIActions } from '@md-managers/use-ui-actions';
// constants
import { solution } from '@md-modules/fp-puller/constants';
// query
import { GET_PEOPLE } from '@md-shared/queries/people';
// types
import { GetPeopleResponse, GetPeopleVariables } from '@md-shared/queries/people/types';
// components
import { Button } from '@md-shared/components/button/main';
import { CodeBlock } from '@md-shared/components/code-block';
import { ContentLoader } from '@md-shared/components/content-loader';

// views
import { ButtonsWrapper } from '@md-modules/fp-puller/views';

const ITEM_PER_PAGE = 6;

const FPPuller = () => {
  const { data, refetch, loading, error } = useQuery<GetPeopleResponse, GetPeopleVariables>(GET_PEOPLE, {
    variables: { first: ITEM_PER_PAGE },
    notifyOnNetworkStatusChange: true
  });

  const [isActive, setIsActive] = React.useState(false);
  const { openToast, startProgress, doneProgress } = useUIActions();

  const policy = capDelay(500, exponentialBackoff(200));

  // methods
  const logDelay = (delay: number) => TE.fromIO(log(`retrying in ${delay} milliseconds`));

  const refetchPage = (status: RetryStatus, endCursor?: string) =>
    Do(TE.taskEither)
      .bind(
        'noNullableEndCursor',
        pipe(
          O.fromNullable(endCursor),
          TE.fromOption(() => E.toError("Can't find next page!"))
        )
      )
      .bindL('refetchRes', ({ noNullableEndCursor }) =>
        TE.tryCatch(() => {
          startProgress();

          return refetch({
            first: ITEM_PER_PAGE,
            after: noNullableEndCursor
          }).finally(doneProgress);
        }, E.toError)
      )
      .return(({ refetchRes }) => refetchRes.data.allPeople)();

  return (
    <ButtonsWrapper>
      <Button disabled={isActive} isLoading={loading}>
        Start
      </Button>
      <Button disabled={!isActive} preset='cancel'>
        Cancel
      </Button>
    </ButtonsWrapper>
  );
};

export default FPPuller;

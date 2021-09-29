import React from 'react';
// utils
import { pipe } from 'fp-ts/lib/pipeable';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import * as R from 'fp-ts/lib/Record';
import * as NEA from 'fp-ts/NonEmptyArray';
// helpers
import { getEntityMock } from './helpers';
// constants
import { MOCK, MockData } from './constants';

// constants
const MAX_MASS = 60;

const FPTSFirstPage = () => {
  const getEntities = () =>
    pipe(
      TE.tryCatch(() => getEntityMock(MOCK), E.toError),

      TE.chain((data) =>
        pipe(
          NEA.filter<MockData>((obj) => +obj.mass < MAX_MASS)(data as NEA.NonEmptyArray<MockData>),
          O.fold(
            () => TE.left(new Error('Empty arr!')),
            (e) => TE.right(e)
          )
        )
      ),
      TE.fold(
        // eslint-disable-next-line no-console
        (e) => T.fromIO(() => console.log(e)),
        // eslint-disable-next-line no-console
        (e) => T.fromIO(() => console.log(e))
      )
    )();

  // eslint-disable-next-line no-console
  getEntities();

  return <div></div>;
};

export default FPTSFirstPage;

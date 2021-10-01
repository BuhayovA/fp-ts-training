import React from 'react';
// utils
import * as T from 'fp-ts/lib/Task';
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as B from 'fp-ts/lib/boolean';
import { pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as TE from 'fp-ts/lib/TaskEither';
// helpers
import { getEntityMock } from './helpers';
// constants
import { MOCK, MockData } from './constants';

// constants
const MAX_MASS = 60;

const KEYS: Array<keyof MockData> = ['hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender', 'mass'];

const FPTSFirstPage = () => {
  const getEntities = () =>
    pipe(
      TE.tryCatch(() => getEntityMock(MOCK as NEA.NonEmptyArray<MockData>), E.toError),

      TE.chain(
        flow(
          NEA.filter((obj) => +obj.mass < MAX_MASS),
          O.fold(
            () => TE.left(new Error('Empty arr!')),
            (e) => TE.right(e)
          )
        )
      ),

      TE.map(
        NEA.map((obj) =>
          pipe(
            Object.keys(obj) as Array<keyof MockData>,
            A.reduce({} as MockData, (i, key) =>
              pipe(
                obj[key] === 'n/a',
                B.fold(
                  () => ({ ...i, [key]: obj[key] }),
                  () => ({ ...i, [key]: 'UNKNOWN' })
                )
              )
            ),

            () => KEYS,
            A.reduce({} as MockData, (i, key) => ({ ...i, [key]: obj[key] }))
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

  return <div>Task #1</div>;
};

export default FPTSFirstPage;

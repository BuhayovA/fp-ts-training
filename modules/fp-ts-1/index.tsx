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
import { ioTx, MOCK, MockData } from './constants';
// components
import { CodeBlock } from '@md-shared/components/code-block';

// constants
const MAX_MASS = 60;

const KEYS: Array<keyof MockData> = ['hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender', 'mass'];

const FPTSFirstPage = () => {
  const getEntities = pipe(
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
          KEYS,
          A.reduce({} as MockData, (i, key) => ({ ...i, [key]: obj[key] })),

          Object.entries,
          A.reduce({} as MockData, (i, key) =>
            pipe(
              key[0] === 'n/a',
              B.fold(
                () => ({ ...i, [key]: obj[key as keyof MockData] }),
                () => ({ ...i, [key]: 'UNKNOWN' })
              )
            )
          )
        )
      )
    ),

    TE.fold(
      // eslint-disable-next-line no-console
      (e) => T.fromIO(() => console.log(e)),
      // eslint-disable-next-line no-console
      (e) => T.fromIO(() => console.log(e))
    )
  );

  // eslint-disable-next-line no-console
  getEntities().then((res) => console.log('[response]: ', res));

  return (
    <div>
      <CodeBlock label='Handling an async operation' codeTx={ioTx} />
    </div>
  );
};

export default FPTSFirstPage;

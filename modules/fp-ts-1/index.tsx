import React from 'react';
// utils
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as R from 'fp-ts/lib/Record';
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
  // eslint-disable-next-line no-console

  const getEntities = pipe(
    TE.tryCatch(() => getEntityMock(MOCK), E.toError),

    TE.chain(
      flow(
        NEA.fromArray,
        TE.fromOption(() => new Error('Empty arr!'))
      )
    ),

    TE.chain(
      flow(
        NEA.filter<MockData>((obj) => +obj.mass < MAX_MASS),
        TE.fromOption(() => new Error('Empty arr!'))
      )
    ),

    TE.map(
      NEA.map((obj) =>
        pipe(
          KEYS,
          A.reduce({} as MockData, (i, key) =>
            pipe(
              { ...i, [key]: obj[key] },
              R.map((val) => (val === 'n/a' ? 'UNKNOWN' : val))
            )
          )
        )
      )
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

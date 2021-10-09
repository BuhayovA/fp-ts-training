import React from 'react';
// utils
import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as TE from 'fp-ts/lib/TaskEither';
// helpers
import { getEntityMock } from '@md-utils/mock';
// constants
import { MOCK, MockData, input, solution, KEYS, MAX_MASS } from '@md-modules/fp-ts-1/constants';
// components
import { CodeBlock } from '@md-shared/components/code-block';

const FPTSFirstPage = () => {
  const [response, setResponse] = React.useState<E.Either<Error, NEA.NonEmptyArray<MockData>> | string>('');

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
  getEntities().then((res) => {
    // eslint-disable-next-line no-console
    console.log('[response]: ', res);

    setResponse(res);
  });

  return (
    <>
      <CodeBlock label='Handling an async operation: [Input]' codeTx={input} />
      <CodeBlock label='Handling an async operation: [Solution]' codeTx={solution} />
      <CodeBlock label='Handling an async operation: [Response]' codeTx={JSON.stringify(response, null, ' ')} />
    </>
  );
};

export default FPTSFirstPage;

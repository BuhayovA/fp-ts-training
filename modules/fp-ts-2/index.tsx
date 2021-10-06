import React from 'react';
// utils
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import { Do } from 'fp-ts-contrib/lib/Do';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as TE from 'fp-ts/lib/TaskEither';
// constants
import { Person, solution, Starship, KEYS } from '@md-modules/fp-ts-2/constants';
// components
import { CodeBlock } from '@md-shared/components/code-block';

const FPTSSecondPage = () => {
  const getSortEntities = Do(TE.taskEither)
    .bind(
      'peopleRes',
      TE.tryCatch(() => window.fetch('/static/jsons/people.json'), E.toError)
    )
    .bind(
      'starshipsRes',
      TE.tryCatch(() => window.fetch('/static/jsons/starships.json'), E.toError)
    )
    .bindL('people', ({ peopleRes }) => TE.tryCatch<Error, Person[]>(() => peopleRes.json(), E.toError))
    .bindL('starships', ({ starshipsRes }) => TE.tryCatch<Error, Starship[]>(() => starshipsRes.json(), E.toError))
    .bindL('NEAPeople', ({ people }) =>
      pipe(
        people,
        NEA.fromArray,
        TE.fromOption(() => new Error('Empty arr!'))
      )
    )
    .bindL('NEAStarships', ({ starships }) =>
      pipe(
        starships,
        NEA.fromArray,
        TE.fromOption(() => new Error('Empty arr!'))
      )
    )
    .bindL('sorted', ({ NEAPeople, NEAStarships }) =>
      pipe(
        NEAPeople,
        A.map((obj) =>
          pipe(
            KEYS,
            A.reduce({} as Person, (i, key) => ({ ...i, [key]: obj[key] })),
            R.modifyAt('starship', (val) => NEAStarships.find((i) => i.starship === val)),
            O.getOrElse<Record<keyof Person, unknown>>(() => obj)
          )
        ),
        (e) => e,
        TE.right
      )
    )
    .return(({ sorted }) => sorted);

  getSortEntities().then((res) => console.log(res));

  return (
    <div>
      <CodeBlock label='Handling an async operation: [Solution]' codeTx={solution} />
    </div>
  );
};

export default FPTSSecondPage;

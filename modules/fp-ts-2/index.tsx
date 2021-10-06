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
import { Person, solution, Starship, KEYS, input } from '@md-modules/fp-ts-2/constants';
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
    .bindL('peopleWithHisStarship', ({ people, starships }) =>
      pipe(
        people,
        A.map((obj) =>
          pipe(
            KEYS,
            A.reduce({} as Person, (i, key) => ({ ...i, [key]: obj[key] })),
            R.modifyAt<Starship | string>('starship', (val) => starships.find((i) => i.starship === val) || val),
            O.getOrElse<Record<keyof Person, string | Starship>>(() => obj)
          )
        ),
        (e) => e,
        TE.right
      )
    )
    .return(({ peopleWithHisStarship }) => peopleWithHisStarship);

  // eslint-disable-next-line no-console
  getSortEntities().then((res) => console.log(res));

  return (
    <div>
      <CodeBlock label='Handling an async operation with "Do" method: [Input on JSON format]' codeTx={input} />
      <CodeBlock label='Handling an async operation with "Do" method: [Solution]' codeTx={solution} />
    </div>
  );
};

export default FPTSSecondPage;

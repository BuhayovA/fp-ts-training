import React from 'react';
// utils
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as B from 'fp-ts/lib/boolean';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import { Do } from 'fp-ts-contrib/lib/Do';
import * as TE from 'fp-ts/lib/TaskEither';
// constants
import { Person, solution, Starship, KEYS, input, NewPerson } from '@md-modules/fp-ts-2/constants';
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
            A.reduce({} as NewPerson, (i, key) => ({
              ...i,
              [key]: pipe(
                key === 'starship',
                B.fold(
                  () => obj[key],
                  () =>
                    pipe(
                      starships,
                      A.findFirst((i) => i.starship === obj[key]),
                      O.getOrElse(() => obj[key])
                    )
                )
              )
            }))
          )
        ),

        TE.right
      )
    )
    .return<NewPerson[]>(({ peopleWithHisStarship }) => peopleWithHisStarship);

  // eslint-disable-next-line no-console
  getSortEntities().then((res) => console.log(res));

  return (
    <>
      <CodeBlock label='Handling an async operation with "Do" method: [Input on JSON format]' codeTx={input} />
      <CodeBlock label='Handling an async operation with "Do" method: [Solution]' codeTx={solution} />
    </>
  );
};

export default FPTSSecondPage;

export interface Person {
  url: string;
  name: string;
  mass: string;
  height: string;
  gender: string;
  edited: string;
  created: string;
  eye_color: string;
  homeworld: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  starship: Starship | string;
}

export interface Starship {
  url: string;
  MGLT: string;
  name: string;
  crew: string;
  model: string;
  length: string;
  edited: string;
  created: string;
  starship: string;
  passengers: string;
  consumables: string;
  manufacturer: string;
  starship_class: string;
  cargo_capacity: string;
  cost_in_credits: string;
  hyperdrive_rating: string;
  max_atmosphering_speed: string;
}

export const KEYS: Array<keyof Person> = [
  'name',
  'height',
  'eye_color',
  'birth_year',
  'gender',
  'mass',
  'starship',
  'hair_color',
  'skin_color'
];

export const solution = `
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
`;

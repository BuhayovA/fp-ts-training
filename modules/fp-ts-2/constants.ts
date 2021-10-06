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
`;

export const input = `{
  people: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      starship: '6676a3e1-8cf8-4bee-9205-d27b9a364bc2',
      homeworld: 'https://swapi.dev/api/planets/1/',
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/'
    },
    
    and more...
  ],

  starships: [
    {
      name: 'CR90 corvette',
      model: 'CR90 corvette',
      manufacturer: 'Corellian Engineering Corporation',
      cost_in_credits: '3500000',
      length: '150',
      max_atmosphering_speed: '950',
      crew: '30-165',
      passengers: '600',
      cargo_capacity: '3000000',
      consumables: '1 year',
      hyperdrive_rating: '2.0',
      MGLT: '60',
      starship: '6676a3e1-8cf8-4bee-9205-d27b9a364bc2',
      starship_class: 'corvette',
      created: '2014-12-10T14:20:33.369000Z',
      edited: '2014-12-20T21:23:49.867000Z',
      url: 'https://swapi.dev/api/starships/2/'
    },
    
    and more...
  ]
}`;

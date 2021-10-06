export interface MockData {
  name: string;
  mass: string;
  gender: string;
  height: string;
  eye_color: string;
  skin_color: string;
  hair_color: string;
  birth_year: string;
}

export const MAX_MASS = 60;

export const KEYS: Array<keyof MockData> = ['hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender', 'mass'];

export const MOCK: MockData[] = [
  {
    name: 'Luke Skywalker',

    height: '172',

    mass: '77',

    hair_color: 'blond',

    skin_color: 'fair',

    eye_color: 'blue',

    birth_year: '19BBY',

    gender: 'male'
  },

  {
    name: 'C-3PO',

    height: '167',

    mass: '75',

    hair_color: 'n/a',

    skin_color: 'gold',

    eye_color: 'yellow',

    birth_year: '112BBY',

    gender: 'n/a'
  },

  {
    name: 'R2-D2',

    height: '96',

    mass: '32',

    hair_color: 'n/a',

    skin_color: 'white, blue',

    eye_color: 'red',

    birth_year: '33BBY',

    gender: 'n/a'
  },

  {
    name: 'Darth Vader',

    height: '202',

    mass: '136',

    hair_color: 'none',

    skin_color: 'white',

    eye_color: 'yellow',

    birth_year: '41.9BBY',

    gender: 'male'
  },

  {
    name: 'Leia Organa',

    height: '150',

    mass: '49',

    hair_color: 'brown',

    skin_color: 'light',

    eye_color: 'brown',

    birth_year: '19BBY',

    gender: 'female'
  },

  {
    name: 'Owen Lars',

    height: '178',

    mass: '120',

    hair_color: 'brown, grey',

    skin_color: 'light',

    eye_color: 'blue',

    birth_year: '52BBY',

    gender: 'male'
  },

  {
    name: 'Beru Whitesun lars',

    height: '165',

    mass: '75',

    hair_color: 'brown',

    skin_color: 'light',

    eye_color: 'blue',

    birth_year: '47BBY',

    gender: 'female'
  },

  {
    name: 'R5-D4',

    height: '97',

    mass: '32',

    hair_color: 'n/a',

    skin_color: 'white, red',

    eye_color: 'red',

    birth_year: 'unknown',

    gender: 'n/a'
  },

  {
    name: 'Biggs Darklighter',

    height: '183',

    mass: '84',

    hair_color: 'black',

    skin_color: 'light',

    eye_color: 'brown',

    birth_year: '24BBY',

    gender: 'male'
  },

  {
    name: 'Obi-Wan Kenobi',

    height: '182',

    mass: '77',

    hair_color: 'auburn, white',

    skin_color: 'fair',

    eye_color: 'blue-gray',

    birth_year: '57BBY',

    gender: 'male'
  }
];

export const solution = `
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
`;

export const input = `
export const MOCK: MockData[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male'
  },

  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a'
  },

  {
    name: 'R2-D2',
    height: '96',
    mass: '32',
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a'
  },

  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male'
  },

  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '19BBY',
    gender: 'female'
  },

  {
    name: 'Owen Lars',
    height: '178',
    mass: '120',
    hair_color: 'brown, grey',
    skin_color: 'light',
    eye_color: 'blue',
    birth_year: '52BBY',
    gender: 'male'
  },

  {
    name: 'Beru Whitesun lars',
    height: '165',
    mass: '75',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'blue',
    birth_year: '47BBY',
    gender: 'female'
  },

  {
    name: 'R5-D4',
    height: '97',
    mass: '32',
    hair_color: 'n/a',
    skin_color: 'white, red',
    eye_color: 'red',
    birth_year: 'unknown',
    gender: 'n/a'
  },

  {
    name: 'Biggs Darklighter',
    height: '183',
    mass: '84',
    hair_color: 'black',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '24BBY',
    gender: 'male'
  },

  {
    name: 'Obi-Wan Kenobi',
    height: '182',
    mass: '77',
    hair_color: 'auburn, white',
    skin_color: 'fair',
    eye_color: 'blue-gray',
    birth_year: '57BBY',
    gender: 'male'
  }
];
`;

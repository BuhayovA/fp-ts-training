export interface Person {
  id: string;
  name: string;
  birthYear: string | null;
  eyeColor:
    | 'UNKNOWN'
    | 'BLUE'
    | 'YELLOW'
    | 'RED'
    | 'BROWN'
    | 'BLUEGREY'
    | 'BLACK'
    | 'ORANGE'
    | 'HAZEL'
    | 'PINK'
    | 'GOLD'
    | 'GREEN'
    | 'WHITE'
    | 'DARK';
  hairColor: 'AUBURN' | 'BLACK' | 'BLONDE' | 'BROWN' | 'GREY' | 'UNKNOWN' | 'WHITE';
  skinColor: string;
  gender: 'UNKNOWN' | 'MALE' | 'FEMALE' | 'HERMAPHRODITE';
  createdAt: string;
  updatedAt: string;
  mass: number;
  height: number;
}

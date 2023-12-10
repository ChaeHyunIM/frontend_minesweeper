export const GAME_LEVEL = [
  {
    name: 'Beginner',
    rows: 8,
    cols: 8,
    mines: 10,
  },
  {
    name: 'Intermediate',
    rows: 16,
    cols: 16,
    mines: 40,
  },
  {
    name: 'Expert',
    rows: 16,
    cols: 32,
    mines: 100,
  },
  {
    name: 'Custom',
    rows: 0,
    cols: 0,
    mines: 0,
  },
] as const;

// levelSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GAME_LEVEL } from '../../constants/GameLevel';

export type Level = 'Beginner' | 'Intermediate' | 'Expert' | 'Custom';

interface LevelState {
  name: Level;
  rows: number;
  cols: number;
  mines: number;
}

const initialState: LevelState = {
  name: (localStorage.getItem('level') as Level) || GAME_LEVEL[1].name,
  rows: Number(localStorage.getItem('rows') || GAME_LEVEL[1].rows.toString()),
  cols: Number(localStorage.getItem('cols') || GAME_LEVEL[1].cols.toString()),
  mines: Number(localStorage.getItem('mines') || GAME_LEVEL[1].mines.toString()),
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<LevelState>) => {
      state.name = action.payload.name;
      state.rows = action.payload.rows;
      state.cols = action.payload.cols;
      state.mines = action.payload.mines;
    },
  },
});

export const { setLevel } = levelSlice.actions;
export default levelSlice.reducer;

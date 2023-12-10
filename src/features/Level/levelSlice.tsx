// levelSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Level = 'Beginner' | 'Intermediate' | 'Expert' | 'Custom';

interface LevelState {
  currentLevel: Level;
}

const initialState: LevelState = {
  currentLevel: 'Intermediate',
};

const levelSlice = createSlice({
  name: 'level',
  initialState: {
    currentLevel: 'Intermediate',
  },
  reducers: {
    setLevel: (state, action: PayloadAction<Level>) => {
      state.currentLevel = action.payload;
    },
  },
});

export const { setLevel } = levelSlice.actions;
export default levelSlice.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../features/Board/boardSlice';
import timerReducer from '../features/Timer/timerSlice';
import levelReducer from '../features/Level/levelSlice';

export const store = configureStore({
  reducer: {
    level: levelReducer,
    board: boardReducer,
    timer: timerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

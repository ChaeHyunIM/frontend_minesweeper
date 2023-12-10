import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import boardReducer from '../features/counter/boardSlice';
import timerReducer from '../features/counter/timerSlice';
import levelReducer from '../features/counter/levelSlice';

export const store = configureStore({
  reducer: {
    level: levelReducer,
    counter: counterReducer,
    board: boardReducer,
    timer: timerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  value: number;
  intervalId?: NodeJS.Timeout;
}

const initialState: TimerState = { value: 0 };

export const startTimer = createAsyncThunk('timer/startTimer', async (_, { dispatch }) => {
  const intervalId = setInterval(() => {
    dispatch(increment());
  }, 1000);

  return intervalId;
});

export const stopTimer = createAsyncThunk('timer/stopTimer', async (_, { getState }) => {
  const { intervalId } = (getState() as { timer: TimerState }).timer;
  if (intervalId) {
    clearInterval(intervalId);
  }
});

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    reset: state => {
      state.value = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(startTimer.fulfilled, (state, action: PayloadAction<NodeJS.Timeout>) => {
        state.intervalId = action.payload;
      })
      .addCase(stopTimer.fulfilled, state => {
        state.intervalId = undefined;
      });
  },
});

export const { increment, reset } = timerSlice.actions;

export default timerSlice.reducer;

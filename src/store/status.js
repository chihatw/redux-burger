import { createSlice } from '@reduxjs/toolkit';

// Reducer
const initialStatus = {
  score: 0,
  time: 60,
  lives: 3,
  loading: false,
  exactOrder: true,
  paused: false,
  winStreak: 1,
};

const slice = createSlice({
  name: 'status',
  initialState: initialStatus,
  reducers: {
    updateExactOrder: (state, action) => {
      if (state.time > 0 && state.lives > 0) {
        state.exactOrder = action.payload;
      }
    },
    updateWinStreak: (state, action) => {
      if (state.time > 0 && state.lives > 0) {
        state.winStreak = state.exactOrder ? state.winStreak + 1 : 1;
      }
    },
    updateScore: (state, action) => {
      if (state.time > 0 && state.lives > 0) {
        state.score =
          state.score + (state.winStreak * state.exactOrder ? 10 : 5);
      }
    },
    updateTime: (state, action) => {
      state.time = --state.time;
    },
    updateLives: (state, action) => {
      state.lives = Math.max(state.lives - 1, 0);
    },
    togglePause: (state, action) => {
      state.paused = !state.paused;
    },
    setPause: (state, action) => {
      state.paused = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
    initializeStatus: (state, action) => {
      return initialStatus;
    },
  },
});
export const {
  setPause,
  setLoading,
  updateTime,
  updateScore,
  updateLives,
  togglePause,
  updateWinStreak,
  initializeStatus,
  updateExactOrder,
} = slice.actions;
export default slice.reducer;

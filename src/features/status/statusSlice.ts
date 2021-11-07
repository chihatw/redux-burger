import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Reducer
const initialStatus = {
  index: 0,
  time: 60,
  score: 0,
  lives: 3,
  paused: false,
  loading: false,
  winStreak: 1,
  exactOrder: true,
};

const slice = createSlice({
  name: 'status',
  initialState: initialStatus,
  reducers: {
    updateTime: (state) => {
      state.time--;
    },
    updateScore: (state) => {
      if (state.time > 0 && state.lives > 0) {
        state.score += state.winStreak * (state.exactOrder ? 10 : 5);
        state.winStreak = state.exactOrder ? state.winStreak + 1 : 1;
        state.exactOrder = true;
      }
      state.index++;
    },
    updateLives: (state) => {
      state.lives = Math.max(state.lives - 1, 0);
      state.exactOrder = false;
    },
    togglePause: (state) => {
      state.paused = !state.paused;
    },
    setPause: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    initializeStatus: () => initialStatus,
  },
});
export const {
  setPause,
  setLoading,
  updateTime,
  updateScore,
  updateLives,
  togglePause,
  initializeStatus,
} = slice.actions;
export default slice.reducer;

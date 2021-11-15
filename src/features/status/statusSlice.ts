import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialStatus = {
  time: 60,
  score: 0,
  lives: 3,
  paused: false,
  loading: false,
  winStreak: 1,
  isFocused: true,
  exactOrder: true,
  shownWelcomeScreen: true,
};

const slice = createSlice({
  name: 'status',
  initialState: initialStatus,
  reducers: {
    handleFocused: (state) => {
      state.isFocused = true;
    },
    handleBlurred: (state) => {
      state.isFocused = false;
    },
    hideWelcomeScreen: (state) => {
      state.shownWelcomeScreen = false;
    },
    updateTime: (state) => {
      state.time--;
    },
    updateScore: (state) => {
      if (state.time > 0 && state.lives > 0) {
        state.score += state.winStreak * (state.exactOrder ? 10 : 5);
        state.winStreak = state.exactOrder ? state.winStreak + 1 : 1;
        state.exactOrder = true;
      }
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
    initializeStatus: (
      _,
      action: PayloadAction<{ withWelcomeScreen: boolean }>
    ) => ({
      ...initialStatus,
      shownWelcomeScreen: action.payload.withWelcomeScreen,
    }),
  },
});
export const {
  setPause,
  setLoading,
  updateTime,
  updateScore,
  updateLives,
  togglePause,
  handleFocused,
  handleBlurred,
  initializeStatus,
  hideWelcomeScreen,
} = slice.actions;
export default slice.reducer;

export const selectLivesArray = createSelector(
  // ここ↓↓↓を state.status にすると、 statusの他のプロパティが変更される度に処理が行われる
  (state: RootState) => state.status.lives,
  (lives) => {
    return new Array(lives).fill('').map((_, index) => index + 1); // [0, 1, 2]
  }
);

import { createSlice } from '@reduxjs/toolkit';
import rnd from 'randomstring';
import helpers from '../helpers';

const IngredientsArray = [
  'Cheese',
  'Pickles',
  'Lettuce',
  'Tomato',
  'Patty',
  'Bacon',
];

// Reducer
const gameInitialStatus = {
  burgers: [{ ingredients: [] }],
  burgerIndex: 0,
  score: 0,
  time: 60,
  lives: 3,
  loading: false,
  exactOrder: true,
  paused: false,
  winStreak: 1,
  orders: helpers.randomizeOrder(2, IngredientsArray),
};

const slice = createSlice({
  name: 'gameStatus',
  initialState: gameInitialStatus,
  reducers: {
    addIngredientBurger: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.name === action.payload.name
      );
      state.burgers[state.burgerIndex].ingredients.unshift({
        key: rnd.generate(8),
        ...action.payload,
      });
      if (index !== -1) {
        state.orders[index].count--;
      }
    },
    serveBurger: (state, action) => {
      state.burgers.push({ ingredients: [] });
      state.burgerIndex++;
    },
    updateExactOrder: (state, action) => {
      if (state.time > 0 && state.lives > 0) {
        state.exactOrder = action.payload;
      }
    },
    randomizeOrders: (state, action) => {
      state.orders = helpers.randomizeOrder(
        helpers.setNumberOfOrders(state.time),
        IngredientsArray
      );
    },
    updateOrders: (state, action) => {
      state.orders = state.orders.filter((order) => order.count > 0);
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
    initialize: (state, action) => {
      return gameInitialStatus;
    },
  },
});
export const {
  serveBurger,
  updateWinStreak,
  updateScore,
  updateExactOrder,
  randomizeOrders,
  initialize,
  setLoading,
  updateLives,
  addIngredientBurger,
  setPause,
  updateOrders,
  updateTime,
  togglePause,
} = slice.actions;
export default slice.reducer;

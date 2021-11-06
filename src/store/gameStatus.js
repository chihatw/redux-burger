import { createAction, createReducer } from '@reduxjs/toolkit';
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

//  Action creator
export const serveBurger = createAction('serveBurger');
export const updateWinStreak = createAction('updateWinStreak');
export const updateScore = createAction('updateScore');
export const updateExactOrder = createAction('updateExactOrder');
export const randomizeOrders = createAction('randomizeOrders');
export const initialize = createAction('initialize');
export const setLoading = createAction('setLoading');
export const updateLives = createAction('updateLives');
export const addIngredientBurger = createAction('addIngredientBurger');
export const setPause = createAction('setPause');
export const updateOrders = createAction('updateOrders');
export const updateTime = createAction('updateTime');
export const togglePause = createAction('togglePause');

// Reducer
const gameInitialStatus = {
  burgers: [{ ingredients: [] }],
  burgerIndex: 0,
  score: 0,
  time: 7,
  lives: 3,
  loading: false,
  exactOrder: true,
  paused: false,
  winStreak: 1,
  orders: helpers.randomizeOrder(2, IngredientsArray),
};

export default createReducer(gameInitialStatus, (builder) => {
  builder
    .addCase(addIngredientBurger, (state, action) => {
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
    })
    .addCase(serveBurger, (state, action) => {
      state.burgers.push({ ingredients: [] });
      state.burgerIndex++;
    })
    .addCase(updateExactOrder, (state, action) => {
      if (state.time > 0 && state.lives > 0) {
        state.exactOrder = action.payload;
      }
    })
    .addCase(randomizeOrders, (state, action) => {
      state.orders = helpers.randomizeOrder(
        helpers.setNumberOfOrders(state.time),
        IngredientsArray
      );
    })
    .addCase(updateOrders, (state, action) => {
      state.orders = state.orders.filter((order) => order.count > 0);
    })
    .addCase(updateWinStreak, (state, action) => {
      if (state.time > 0 && state.lives > 0) {
        state.winStreak = state.exactOrder ? state.winStreak + 1 : 1;
      }
    })
    .addCase(updateScore, (state, action) => {
      if (state.time > 0 && state.lives > 0) {
        state.score =
          state.score + (state.winStreak * state.exactOrder ? 10 : 5);
      }
    })
    .addCase(updateTime, (state, action) => {
      state.time = --state.time;
    })
    .addCase(updateLives, (state, action) => {
      state.lives = Math.max(state.lives - 1, 0);
    })
    .addCase(togglePause, (state, action) => {
      state.paused = !state.paused;
    })
    .addCase(setPause, (state, action) => {
      state.paused = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = true;
    })
    .addCase(initialize, (state, action) => {
      return gameInitialStatus;
    });
});

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
const initialBurgers = {
  index: 0,
  orders: helpers.randomizeOrder(2, IngredientsArray),
  burgers: [{ ingredients: [] }],
};

const slice = createSlice({
  name: 'burgers',
  initialState: initialBurgers,
  reducers: {
    addIngredientBurger: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.name === action.payload.name
      );
      state.burgers[state.index].ingredients.unshift({
        key: rnd.generate(8),
        ...action.payload,
      });
      if (index !== -1) {
        state.orders[index].count--;
      }
    },
    serveBurger: (state, action) => {
      state.burgers.push({ ingredients: [] });
      state.index++;
    },
    randomizeOrders: (state, action) => {
      state.orders = helpers.randomizeOrder(
        helpers.setNumberOfOrders(action.payload),
        IngredientsArray
      );
    },
    updateOrders: (state, action) => {
      state.orders = state.orders.filter((order) => order.count > 0);
    },
    initializeBurgers: (state, action) => {
      return initialBurgers;
    },
  },
});
export const {
  addIngredientBurger,
  serveBurger,
  randomizeOrders,
  updateOrders,
  initializeBurgers,
} = slice.actions;
export default slice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import rnd from 'randomstring';
import helpers from '../../helpers';

export type Order = {
  name: string;
  count: number;
};

type Ingredient = {
  className: string;
  height: number;
  name: string;
  key: string;
};

type Burgers = {
  orders: Order[];
  burgers: {
    ingredients: Ingredient[];
  }[];
};

const IngredientsArray = [
  'Cheese',
  'Pickles',
  'Lettuce',
  'Tomato',
  'Patty',
  'Bacon',
];

// Reducer
const initialBurgers: Burgers = {
  orders: helpers.randomizeOrder(2, IngredientsArray),
  burgers: [{ ingredients: [] }],
};

const slice = createSlice({
  name: 'burgers',
  initialState: initialBurgers,
  reducers: {
    addIngredientBurger: (
      state: Burgers,
      action: PayloadAction<{
        index: number;
        ingredient: Omit<Ingredient, 'key'>;
      }>
    ) => {
      const index = state.orders.findIndex(
        (order) => order.name === action.payload.ingredient.name
      );
      state.burgers[action.payload.index].ingredients.unshift({
        key: rnd.generate(8),
        ...action.payload.ingredient,
      });
      if (index !== -1) {
        state.orders[index].count--;
      }
      state.orders = state.orders.filter((order) => order.count > 0);
    },
    serveBurger: (state) => {
      state.burgers.push({ ingredients: [] });
    },
    randomizeOrders: (state, action: PayloadAction<number>) => {
      state.orders = helpers.randomizeOrder(
        helpers.setNumberOfOrders(action.payload),
        IngredientsArray
      );
    },
    initializeBurgers: () => initialBurgers,
  },
});

export const {
  serveBurger,
  randomizeOrders,
  initializeBurgers,
  addIngredientBurger,
} = slice.actions;

export default slice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientsArray } from '../../constants';
import helpers from '../../helpers';

export type Order = {
  name: string;
  count: number;
};

const initialState = helpers.randomizeOrder(2, IngredientsArray);

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrders: (
      state,
      action: PayloadAction<{
        index: number;
        ingredient: { name: string };
      }>
    ) => {
      const index = state.findIndex(
        (order) => order.name === action.payload.ingredient.name
      );
      index !== -1 && state[index].count--;
      !state[index].count && state.splice(index, 1);
    },
    addOrders: (state, action: PayloadAction<number>) => {
      const newOrders = helpers.randomizeOrder(
        helpers.setNumberOfOrders(action.payload),
        IngredientsArray
      );
      newOrders.forEach((order) => {
        state.push(order);
      });
    },
  },
});

export const { addOrders, updateOrders } = slice.actions;
export default slice.reducer;

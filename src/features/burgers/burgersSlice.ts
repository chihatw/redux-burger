import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import rnd from 'randomstring';

type Ingredient = {
  className: string;
  height: number;
  name: string;
  key: string;
};
type Burgers = Ingredient[][];
const initialBurgers: Burgers = [[]];

const slice = createSlice({
  name: 'burgers',
  initialState: initialBurgers,
  reducers: {
    updateBurgers: (
      state: Burgers,
      action: PayloadAction<{
        index: number;
        ingredient: Omit<Ingredient, 'key'>;
      }>
    ) => {
      state[action.payload.index].unshift({
        key: rnd.generate(8),
        ...action.payload.ingredient,
      });
    },
    addBurger: (state) => {
      state.push([]);
    },
    initializeBurgers: () => initialBurgers,
  },
});

export const { addBurger, updateBurgers, initializeBurgers } = slice.actions;

export default slice.reducer;

import {
  nanoid,
  createSlice,
  PayloadAction,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Ingredient = {
  key: string;
  name: string;
  height: number;
  className: string;
};

type Burger = {
  id: string;
  ingredients: Ingredient[];
};

const burgersAdapter = createEntityAdapter<Burger>({
  sortComparer: (a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true }),
});

const emptyState = burgersAdapter.getInitialState();

const initialState = burgersAdapter.setAll(emptyState, [
  {
    id: String(0),
    ingredients: [],
  },
]);

const slice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    addIngredientToLastBurger: (
      state,
      action: PayloadAction<Omit<Ingredient, 'key'>>
    ) => {
      const [lastId] = state.ids.slice(-1);
      const ingredients = state.entities[lastId]?.ingredients as Ingredient[];
      ingredients.unshift({
        key: nanoid(8),
        ...action.payload,
      });

      burgersAdapter.updateOne(state, { id: lastId, changes: { ingredients } });
    },
    addBurger: (state) => {
      burgersAdapter.addOne(state, {
        id: String(state.ids.length),
        ingredients: [],
      });
    },
    initializeBurgers: () => initialState,
  },
});

export const { addBurger, addIngredientToLastBurger, initializeBurgers } =
  slice.actions;

export default slice.reducer;

export const { selectTotal: selectTotalBurgers } =
  burgersAdapter.getSelectors<RootState>((state) => state.burgers);

export const selectLastBurger = createSelector(
  (state: RootState) => state.burgers,
  (burgers) => {
    const [lastId] = burgers.ids.slice(-1);
    return burgers.entities[lastId];
  }
);

import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IngredientsArray } from '../../constants';
import helpers from '../../helpers';

export type Order = {
  id: string;
  name: string;
  count: number;
};

const ordersAdapter = createEntityAdapter<Order>({
  sortComparer: (a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true }),
});

const emptyState = ordersAdapter.getInitialState();

const initialState = ordersAdapter.setAll(
  emptyState,
  helpers.randomizeOrder(2, IngredientsArray)
);

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrders: (state, action: PayloadAction<{ name: string }>) => {
      const orders: Order[] = state.ids.map((id) => ({
        id: id as string,
        name: state.entities[id]?.name as string,
        count: state.entities[id]?.count as number,
      }));

      const index = orders.findIndex(
        (order) => order.name === action.payload.name
      );
      index !== -1 && orders[index].count--;
      !orders[index].count && orders.splice(index, 1);
      ordersAdapter.setAll(state, orders);
    },
    createOrders: {
      reducer: (state, action: PayloadAction<Order[]>) =>
        ordersAdapter.setAll(state, action),
      prepare: (time: number) => {
        const newOrders = helpers.randomizeOrder(
          helpers.setNumberOfOrders(time),
          IngredientsArray
        );
        return { payload: newOrders };
      },
    },
  },
});

export const { createOrders, updateOrders } = slice.actions;
export default slice.reducer;

export const { selectAll: selectAllOrders, selectTotal: selectTotalOrders } =
  ordersAdapter.getSelectors<RootState>((state) => state.orders);

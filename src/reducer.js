import { combineReducers } from 'redux';
import update from 'immutability-helper';

import gameConstants, { IngredientsArray } from './constants';
import helpers from './helpers';

const gameInitialStatus = {
  burgers: [{ ingredients: [] }],
  burgerIndex: 0,
  score: 0,
  time: 10,
  lives: 3,
  loading: false,
  exactOrder: true,
  paused: false,
  winStreak: 1,
  orders: helpers.randomizeOrder(2, IngredientsArray),
};

const gameStatus = (state = gameInitialStatus, action) => {
  switch (action.type) {
    case gameConstants.ADD_INGREDIENT_BURGER: {
      const index = state.orders.findIndex(
        (order) => order.name === action.payload.name
      );

      return update(state, {
        burgers: {
          [state.burgerIndex]: { ingredients: { $unshift: [action.payload] } },
        },
        orders:
          index !== -1
            ? {
                [index]: { count: { $set: state.orders[index].count - 1 } },
              }
            : {
                orders: { $set: state.orders },
              },
      });
    }

    case gameConstants.SERVE_BURGER: {
      return update(state, {
        burgers: { $push: [{ ingredients: [] }] },
        burgerIndex: { $set: ++state.burgerIndex },
      });
    }

    case gameConstants.UPDATE_EXACTORDER: {
      return update(state, {
        exactOrder: { $set: action.payload },
      });
    }

    case gameConstants.RANDOMIZE_ORDERS: {
      return update(state, {
        orders: {
          $set: helpers.randomizeOrder(
            helpers.setNumberOfOrders(state.time),
            IngredientsArray
          ),
        },
      });
    }

    case gameConstants.UPDATE_ORDERS: {
      return update(state, {
        orders: { $set: state.orders.filter((order) => order.count > 0) },
      });
    }

    case gameConstants.UPDATE_WINSTREAK: {
      return update(state, {
        winStreak: { $set: action.payload ? state.winStreak + 1 : 1 },
      });
    }

    case gameConstants.UPDATE_SCORE: {
      return update(state, {
        score: { $set: state.score + action.payload },
      });
    }

    case gameConstants.UPDATE_TIME: {
      return update(state, { time: { $set: action.payload } });
    }

    case gameConstants.UPDATE_LIVES: {
      return update(state, {
        lives: { $set: state.lives > 0 ? state.lives - 1 : 0 },
      });
    }

    case gameConstants.TOGGLE_PAUSE: {
      return update(state, {
        paused: { $set: !state.paused },
      });
    }

    case gameConstants.SET_PAUSE: {
      return update(state, {
        paused: { $set: action.payload },
      });
    }

    case gameConstants.SET_LOADING: {
      return update(state, {
        loading: { $set: true },
      });
    }

    case gameConstants.INITIALIZE:
    default:
      return gameInitialStatus;
  }
};

const rootReducer = combineReducers({
  gameStatus,
});

export default rootReducer;

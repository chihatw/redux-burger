import { configureStore } from '@reduxjs/toolkit';
import reducer from './gameStatus';

const configureAppStore = () => {
  return configureStore({ reducer });
};

export default configureAppStore;

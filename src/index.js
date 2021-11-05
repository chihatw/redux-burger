import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

//Images
import Cheese from './img/Cheese.png';
import Lettuce from './img/Lettuce.png';
import Patty from './img/Patty.png';
import Pickles from './img/Pickles.png';
import Tomato from './img/Tomato.png';
import Bacon from './img/Bacon.png';

import './index.css';
import App from './App';

import rootReducer from './reducer';

export const imgs = {
  Bacon: Bacon,
  Patty: Patty,
  Cheese: Cheese,
  Lettuce: Lettuce,
  Pickles: Pickles,
  Tomato: Tomato,
};

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    {/* タッチに対応させるかどうかでbackendを切り替える */}
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

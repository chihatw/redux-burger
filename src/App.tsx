import React, { useEffect } from 'react';

import styled from 'styled-components';

import Bg from './img/bg.png';

import GameBurger from './containers/GameBurger';
import GameIngredients from './containers/GameIngredients';
import GameOrder from './containers/GameOrder';
import GameTimer from './containers/GameTimer';
import GameScore from './containers/GameScore';
import GameLives from './containers/GameLives';
import GameStars from './containers/GameStars';
import GameDroppableArea from './containers/GameDroppableArea';
import GameWelcomeScreen from './containers/GameWelcomeScreen';
import GameModalResult from './containers/GameModalResult';
import GameModalSettings from './containers/GameModalSettings';

import useGameAudio from './hooks/useGameAudio';

import { device } from './constants';

import './App.css';
import {
  setPause,
  handleBlurred,
  handleFocused,
  updateScore,
} from './features/status/statusSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addBurger } from './features/burgers/burgersSlice';
import { createOrders } from './features/orders/ordersSlice';

const GameMainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  overflow: hidden;
  user-select: none;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${device.tablet} {
    max-width: 640px;
    max-height: 640px;
  }

  img.bg {
    position: absolute;
    width: 100%;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    min-width: 500px;
  }
`;

const App = () => {
  const isFocused = useAppSelector((state) => state.status.isFocused);
  const shownWelcomeScreen = useAppSelector(
    (state) => state.status.shownWelcomeScreen
  );
  const ordersComplete = useAppSelector(
    (state) => state.orders.ids.length === 0
  );
  const time = useAppSelector((state) => state.status.time);

  const dispatch = useAppDispatch();

  const { playing, stopAudio, startAudio } = useGameAudio('bg', {
    loop: true,
  });

  const { playOnEveryInteraction: playServeSE } = useGameAudio('serve');

  useEffect(() => {
    const onBlur = () => {
      dispatch(handleBlurred());
      playing && stopAudio();
    };

    const onFocus = () => {
      dispatch(handleFocused());
      if (!playing && !shownWelcomeScreen) {
        startAudio();
      }
    };

    dispatch(setPause(!isFocused));

    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, [playing, isFocused, dispatch, stopAudio, startAudio, shownWelcomeScreen]);

  useEffect(() => {
    if (!ordersComplete) return;

    let timerId = 0;
    const flags = { isServed: false, isOrdered: false };
    const startTime = performance.now();

    const timer = (timestamp: number) => {
      const diff = Math.max(timestamp - startTime, 0);
      if (diff > 200 && !flags.isServed) {
        flags.isServed = true;
        dispatch(addBurger());
        dispatch(updateScore());
        playServeSE();
      }
      if (diff > 500 && !flags.isOrdered) {
        flags.isOrdered = true;
        dispatch(createOrders(time));
      }
      timerId = requestAnimationFrame(timer);
    };
    timer(startTime);
    return () => cancelAnimationFrame(timerId);
    // ordersComplete 以外の変化は無視
    // eslint-disable-next-line
  }, [ordersComplete]);

  return (
    <div
      className='App'
      style={{
        color: '#6d6d6d',
        width: '100%',
        height: '100%',
        position: 'fixed',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <GameMainContainer>
        {shownWelcomeScreen ? (
          <GameWelcomeScreen startAudio={startAudio} />
        ) : (
          <>
            <GameModalResult stopAudio={stopAudio} />
            <GameModalSettings stopAudio={stopAudio} />
            <GameDroppableArea />
            <GameStars />
            <GameLives />
            <GameScore />
            <GameTimer />
            <GameOrder />
            <GameBurger />
            <GameIngredients />
          </>
        )}
        <img className='bg' src={Bg} alt='' />
      </GameMainContainer>
    </div>
  );
};

export default App;

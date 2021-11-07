import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { useDispatch } from 'react-redux';

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
import { setPause } from './store/status';

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
  const [start, setStart] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const dispatch = useDispatch();

  const { playing, stopAudio, startAudio } = useGameAudio('bg', {
    loop: true,
  });

  const startGame = () => {
    setStart(true);
    startAudio();
  };

  const stopGame = () => {
    setStart(false);
    stopAudio();
  };

  useEffect(() => {
    const onBlur = () => {
      setBlurred(true);
      playing && stopAudio();
    };

    const onFocus = () => {
      setBlurred(false);
      if (!playing && start) {
        startAudio();
      }
    };

    dispatch(setPause(blurred));

    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, [start, playing, blurred, dispatch, stopAudio, startAudio]);

  return (
    <div
      className='App'
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'fixed',
        textAlign: 'center',
        color: '#6d6d6d',
      }}
    >
      <GameMainContainer>
        {!start ? (
          <GameWelcomeScreen onStart={startGame} />
        ) : (
          <>
            <GameModalResult onExit={stopGame} />
            <GameModalSettings onExit={stopGame} isBlurred={blurred} />
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

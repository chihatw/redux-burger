import React from 'react';
import * as Modal from '../components/Modal';
import Button from '../components/Button';

import {
  togglePause,
  setLoading,
  initializeStatus,
} from '../features/status/statusSlice';
import { initializeBurgers } from '../features/burgers/burgersSlice';
import * as helpers from '../helpers';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const GameModalSetting: React.FC<{ onExit: () => void; isBlurred: boolean }> =
  ({ onExit, isBlurred }) => {
    const dispatch = useAppDispatch();
    const paused = useAppSelector((state) => state.status.paused);

    const handleTogglePause = () => {
      dispatch(togglePause());
    };

    const handleRestart = () => {
      initializeGame();
    };
    const handleExit = () => {
      onExit();
      initializeGame();
    };

    const initializeGame = () => {
      dispatch(setLoading());
      helpers.setTimeoutWithRequestAnimationFrame(() => {
        dispatch(initializeStatus());
        dispatch(initializeBurgers());
      }, 100);
    };
    return (
      <>
        <Modal.Window
          show={paused && !isBlurred}
          backdropOnClick={handleTogglePause}
        >
          <Modal.Title>What would you like to do?</Modal.Title>
          <Button primary onClick={handleTogglePause}>
            <i className='fa fa-fw fa-play' /> Resume
          </Button>
          <Button onClick={handleRestart}>
            <i className='fa fa-fw fa-repeat' /> Restart
          </Button>
          <Button onClick={handleExit}>
            <i className='fa fa-fw fa-sign-out' /> Exit
          </Button>
        </Modal.Window>
        <Button
          settings
          onClick={handleTogglePause}
          style={{
            position: 'absolute',
            zIndex: 15,
            right: '-3px',
            borderRadius: '8px 0px 0px 8px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <i className='fa fa-cog' />
        </Button>
      </>
    );
  };

export default GameModalSetting;
